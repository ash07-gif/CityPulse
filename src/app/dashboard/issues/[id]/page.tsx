'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, MapPin, ThumbsUp, MessageSquare, Send, Shield } from 'lucide-react';
import issuesData from '@/lib/mock-data';
import { getStatusVariant } from '@/lib/utils';
import type { Issue, Comment, IssueStatus } from '@/lib/types';
import placeholderData from '@/lib/placeholder-images.json';
import Link from 'next/link';

export default function IssueDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [issue, setIssue] = useState<Issue | null>(null);
  const [newComment, setNewComment] = useState('');
  const [role, setRole] = useState<string | null>(null);


  useEffect(() => {
    if (id) {
      const foundIssue = issuesData.find((i) => i.id === id);
      setIssue(foundIssue || null);
    }
    const userRole = localStorage.getItem('userRole');
    setRole(userRole);
  }, [id]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && issue) {
      const comment: Comment = {
        id: `c${issue.comments.length + 10}`,
        author: 'Current User', // Replace with actual user
        avatar: 'https://i.pravatar.cc/150?u=currentUser',
        text: newComment,
        date: new Date().toISOString().split('T')[0],
      };
      setIssue({
        ...issue,
        comments: [...issue.comments, comment],
      });
      setNewComment('');
    }
  };
  
  const handleUpvote = () => {
    if (issue) {
      setIssue({ ...issue, upvotes: issue.upvotes + 1 });
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
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to feed
        </Button>
        {role === 'admin' && (
             <Link href={`/dashboard/issues/${issue.id}/manage`} passHref>
                <Button variant="outline">
                    <Shield className="mr-2 h-4 w-4" />
                    Manage Issue
                </Button>
             </Link>
        )}
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={getStatusVariant(issue.status as IssueStatus)}>
                  {issue.status}
                </Badge>
                <Badge variant="secondary">{issue.category}</Badge>
              </div>
              <CardTitle className="text-3xl font-bold font-headline">{issue.title}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${issue.reporter}`} />
                  <AvatarFallback>{issue.reporter.charAt(0)}</AvatarFallback>
                </Avatar>
                Reported by {issue.reporter} on {issue.date}
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4"/>{issue.location}</span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-96 rounded-lg overflow-hidden mb-6">
            <Image
              src={
                placeholderData.placeholderImages.find(p => p.id === issue.image.id)?.imageUrl ||
                `https://picsum.photos/seed/${issue.id}/800/600`
              }
              alt={issue.title}
              layout="fill"
              objectFit="cover"
              data-ai-hint={placeholderData.placeholderImages.find(p => p.id === issue.image.id)?.imageHint}
            />
          </div>
          <p className="text-lg text-foreground whitespace-pre-wrap">{issue.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
            <Button variant="ghost" size="sm" onClick={handleUpvote}>
              <ThumbsUp className="mr-2 h-4 w-4" />
              {issue.upvotes} Upvotes
            </Button>
            <div className="flex items-center text-muted-foreground">
                <MessageSquare className="mr-2 h-4 w-4" />
                {issue.comments.length} Comments
            </div>
        </CardFooter>
      </Card>

      <Card id="comments">
        <CardHeader>
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleCommentSubmit} className="flex items-start gap-4">
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/150?u=currentUser" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <div className="w-full space-y-2">
              <Textarea
                placeholder="Add your comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
              />
              <Button type="submit" disabled={!newComment.trim()} size="sm">
                <Send className="mr-2 h-4 w-4"/>
                Post Comment
              </Button>
            </div>
          </form>

          <div className="space-y-6">
            {issue.comments.length > 0 ? (
              issue.comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={comment.avatar} />
                    <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <p className="font-semibold">{comment.author}</p>
                      <p className="text-xs text-muted-foreground">{comment.date}</p>
                    </div>
                    <p className="text-sm text-foreground">{comment.text}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No comments yet. Be the first to comment!</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
