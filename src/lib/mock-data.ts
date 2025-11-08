import type { Issue } from './types';

const issues: Issue[] = [
  {
    id: '1',
    title: 'Large pothole on Main Street',
    description: 'A very large and dangerous pothole has formed in the middle of Main Street, near the intersection with Oak Avenue. It has already caused damage to several vehicles.',
    category: 'Road',
    status: 'Open',
    location: 'Ward 5',
    reporter: 'Rajesh Kumar',
    date: '2024-07-20',
    upvotes: 25,
    comments: [
        { id: 'c1', author: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?u=priya', text: 'This is a serious issue! I almost damaged my car here yesterday.', date: '2024-07-21' }
    ],
    image: { id: 'pothole', url: 'https://picsum.photos/seed/pothole/600/400' },
    timeline: [{ status: 'Open', date: '2024-07-20' }],
    locationCoords: { lat: 40.7128, lng: -74.0060 }
  },
  {
    id: '2',
    title: 'Streetlight out on Elm Street',
    description: 'The streetlight at the corner of Elm Street and 2nd Avenue has been out for three days, making the area very dark and unsafe at night.',
    category: 'Lighting',
    status: 'In Progress',
    location: 'Ward 2',
    reporter: 'Priya Sharma',
    date: '2024-07-18',
    upvotes: 12,
    comments: [],
    image: { id: 'streetlight', url: 'https://picsum.photos/seed/streetlight/600/400' },
    timeline: [
      { status: 'Open', date: '2024-07-18' },
      { status: 'In Progress', date: '2024-07-21' }
    ],
    locationCoords: { lat: 40.7228, lng: -74.0160 }
  },
  {
    id: '3',
    title: 'Broken water pipe on Pine St',
    description: 'A water pipe has burst on Pine Street, flooding the road and sidewalk. Water is being wasted and it is causing a hazard for pedestrians.',
    category: 'Water',
    status: 'Resolved',
    location: 'Ward 8',
    reporter: 'Anjali Mehta',
    date: '2024-07-15',
    upvotes: 42,
    comments: [
        { id: 'c2', author: 'Admin', avatar: 'https://i.pravatar.cc/150?u=admin', text: 'Our team has resolved this issue.', date: '2024-07-16' },
        { id: 'c3', author: 'Anjali Mehta', avatar: 'https://i.pravatar.cc/150?u=anjali', text: 'Thank you for the quick response!', date: '2024-07-16' }
    ],
    image: { id: 'pipe', url: 'https://picsum.photos/seed/pipe/600/400' },
    timeline: [
        { status: 'Open', date: '2024-07-15' },
        { status: 'In Progress', date: '2024-07-15' },
        { status: 'Resolved', date: '2024-07-16' }
    ],
    locationCoords: { lat: 40.7328, lng: -74.0260 }
  },
  {
    id: '4',
    title: 'Overflowing trash bins at Central Park',
    description: 'The trash and recycling bins at Central Park are overflowing, leading to litter all over the park grounds. This needs to be addressed urgently.',
    category: 'Sanitation',
    status: 'Open',
    location: 'Ward 1',
    reporter: 'Sanjay Singh',
    date: '2024-07-21',
    upvotes: 8,
    comments: [],
    image: { id: 'trash', url: 'https://picsum.photos/seed/trash/600/400' },
    timeline: [{ status: 'Open', date: '2024-07-21' }],
    locationCoords: { lat: 40.7428, lng: -74.0360 }
  },
  {
    id: '5',
    title: 'Fallen tree blocking bike path',
    description: 'A large tree has fallen and is completely blocking the bike path along the river. Cyclists and pedestrians cannot pass.',
    category: 'Others',
    status: 'Resolved',
    location: 'Ward 3',
    reporter: 'Deepak Gupta',
    date: '2024-07-19',
    upvotes: 18,
    comments: [],
    image: { id: 'tree', url: 'https://picsum.photos/seed/tree/600/400' },
    timeline: [
        { status: 'Open', date: '2024-07-19' },
        { status: 'In Progress', date: '2024-07-19' },
        { status: 'Resolved', date: '2024-07-20' }
    ],
    locationCoords: { lat: 40.7528, lng: -74.0460 }
  },
];

export default issues;
