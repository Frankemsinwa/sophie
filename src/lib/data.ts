import { PlaceHolderImages } from '@/lib/placeholder-images';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';
const getImageHint = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageHint || '';

export const userData = {
  name: 'Alex Doe',
  avatarUrl: getImage('user-avatar'),
  avatarHint: getImageHint('user-avatar'),
};

export const metricsData = {
  balance: 180000,
  followers: 2000000,
  likes: 1000000,
  videoCount: 150,
};

export const videosData = [
  {
    id: 1,
    title: 'Epic Gameplay Montage: My Best Moments',
    thumbnailUrl: getImage('video-thumb-1'),
    thumbnailHint: getImageHint('video-thumb-1'),
    views: 257000,
    likes: 12000,
    publishedAt: '3 days ago',
    category: 'Gaming',
    videoUrl: '/VID-20251022-WA0030.mp4'
  },
  {
    id: 2,
    title: 'A day in the life of a content creator',
    thumbnailUrl: getImage('video-thumb-2'),
    thumbnailHint: getImageHint('video-thumb-2'),
    views: 89000,
    likes: 7500,
    publishedAt: '1 week ago',
    category: 'Vlog',
    videoUrl: '/VID-20251022-WA0035.mp4'
  },
  {
    id: 3,
    title: 'Exploring the Hidden Gems of Southeast Asia',
    thumbnailUrl: getImage('video-thumb-3'),
    thumbnailHint: getImageHint('video-thumb-3'),
    views: 175000,
    likes: 9800,
    publishedAt: '2 weeks ago',
    category: 'Travel',
    videoUrl: '/VID-20251022-WA0030.mp4'
  },
  {
    id: 4,
    title: 'How to Make the Perfect Sourdough Bread at Home',
    thumbnailUrl: getImage('video-thumb-4'),
    thumbnailHint: getImageHint('video-thumb-4'),
    views: 320000,
    likes: 21000,
    publishedAt: '1 month ago',
    category: 'Cooking',
  },
   {
    id: 5,
    title: 'My Desk Setup Tour 2024 | Ultimate WFH Space',
    thumbnailUrl: getImage('video-thumb-5'),
    thumbnailHint: getImageHint('video-thumb-5'),
    views: 112000,
    likes: 8200,
    publishedAt: '1 month ago',
    category: 'Tech',
  },
  {
    id: 6,
    title: '24-Hour Gaming Challenge for Charity!',
    thumbnailUrl: getImage('video-thumb-6'),
    thumbnailHint:getImageHint('video-thumb-6'),
    views: 550000,
    likes: 45000,
    publishedAt: '2 months ago',
    category: 'Gaming',
  },
  {
    id: 7,
    title: 'A Week in My Life: Juggling Work and Creativity',
    thumbnailUrl: getImage('video-thumb-7'),
    thumbnailHint: getImageHint('video-thumb-7'),
    views: 98000,
    likes: 6100,
    publishedAt: '2 months ago',
    category: 'Vlog',
  },
];
