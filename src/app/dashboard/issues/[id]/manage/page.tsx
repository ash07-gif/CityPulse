
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import issuesData from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import type { Issue, IssueStatus } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { getStatusVariant } from '@/lib/utils';

export default function ManageIssuePage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const { id } = params;

  const [issue, setIssue] = useState<Issue | null>(null);
  const [newStatus, setNewStatus] = useState<IssueStatus | ''>('');

  useEffect(() => {
    if (id) {
      const foundIssue = issuesData.find((i) => i.id === id);
      if (foundIssue) {
        setIssue(foundIssue);
        setNewStatus(foundIssue.status as IssueStatus);
      }
    }
  }, [id]);

  const handleStatusUpdate = () => {
    if (issue && newStatus) {
      // Find the issue in the mock data and update its status
      const issueIndex = issuesData.findIndex((i) => i.id === issue.id);
      if (issueIndex !== -1) {
        const updatedIssue = {
          ...issuesData[issueIndex],
          status: newStatus,
          timeline: [...issuesData[issueIndex].timeline, { status: newStatus, date: new Date().toISOString().split('T')[0] }]
        };
        issuesData[issueIndex] = updatedIssue as Issue;
        setIssue(updatedIssue as Issue);
      }

      toast({
        title: 'Status Updated',
        description: `Issue status has been changed to "${newStatus}".`,
      });
      router.push(`/dashboard/issues/${issue.id}`);
    }
  };

  if (!issue) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Issue not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Button variant="ghost" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Issue
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Manage Issue</CardTitle>
          <CardDescription>Update the status of the issue reported by {issue.reporter}.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold">{issue.title}</h3>
            <p className="text-sm text-muted-foreground">{issue.description}</p>
            <div className="mt-2 flex gap-2">
                <Badge variant={getStatusVariant(issue.status as IssueStatus)}>{issue.status}</Badge>
                <Badge variant="secondary">{issue.category}</Badge>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Update Status</Label>
            <Select value={newStatus} onValueChange={(value) => setNewStatus(value as IssueStatus)}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleStatusUpdate} disabled={!newStatus || newStatus === issue.status}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
