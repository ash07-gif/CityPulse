'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  MessageSquare,
  Search,
  ThumbsUp,
  MapPin,
} from 'lucide-react';
import Image from 'next/image';
import issuesData from '@/lib/mock-data';
import { getStatusVariant } from '@/lib/utils';
import type { Issue, IssueStatus } from '@/lib/types';
import placeholderData from '@/lib/placeholder-images.json';
import Link from 'next/link';

export default function CommunityPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>(issuesData);

  useEffect(() => {
    const results = issuesData.filter((issue) =>
      issue.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredIssues(results);
  }, [searchTerm]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold font-headline">Community Feed</h1>
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search feed..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {filteredIssues.length > 0 ? (
          filteredIssues.map((issue) => (
            <Card key={issue.id} className="flex flex-col">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${issue.reporter}`} />
                  <AvatarFallback>
                    {issue.reporter.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{issue.reporter}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {issue.date} &middot; <span className="flex items-center gap-1"><MapPin className="h-3 w-3"/>{issue.location}</span>
                  </p>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                 <Link href={`/dashboard/issues/${issue.id}`}>
                    <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4 cursor-pointer">
                        <Image
                            src={
                            placeholderData.placeholderImages.find(
                                (p) => p.id === issue.image.id
                            )?.imageUrl ||
                            `https://picsum.photos/seed/${issue.id}/400/300`
                            }
                            alt={issue.title}
                            layout="fill"
                            objectFit="cover"
                            className="hover:scale-105 transition-transform"
                            data-ai-hint={placeholderData.placeholderImages.find(p => p.id === issue.image.id)?.imageHint}
                        />
                    </div>
                </Link>
                <div className='flex gap-2 mb-2'>
                    <Badge variant={getStatusVariant(issue.status as IssueStatus)}>
                        {issue.status}
                    </Badge>
                    <Badge variant="secondary">{issue.category}</Badge>
                </div>
                <h3 className="font-semibold text-lg hover:underline">
                    <Link href={`/dashboard/issues/${issue.id}`}>{issue.title}</Link>
                </h3>
                <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                  {issue.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  {issue.upvotes} Upvotes
                </Button>
                <Button variant="ghost" size="sm" asChild>
                    <Link href={`/dashboard/issues/${issue.id}#comments`}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        {issue.comments.length} Comments
                    </Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <p>No issues found for your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
