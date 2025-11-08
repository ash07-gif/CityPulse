export type IssueStatus = 'Open' | 'In Progress' | 'Resolved';
export type IssueCategory = 'Road' | 'Water' | 'Lighting' | 'Sanitation' | 'Others';

export type IssueTimelineEvent = {
    status: IssueStatus;
    date: string;
};

export type Issue = {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  status: string;
  location: string;
  reporter: string;
  date: string;
  upvotes: number;
  comments: any[];
  image: { id: string; url: string; };
  timeline: IssueTimelineEvent[];
  locationCoords: { lat: number; lng: number; };
};

export type UserRole = 'resident' | 'admin';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  locality: string;
  avatarUrl: string;
};
