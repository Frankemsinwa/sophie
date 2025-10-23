import { PlaceHolderImages } from '@/lib/placeholder-images';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';
const getImageHint = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageHint || '';

export const userData = {
  name: 'Alex Doe',
  avatarUrl: getImage('user-avatar'),
  avatarHint: getImageHint('user-avatar'),
};

export const metricsData = {
  balance: 12345.67,
  followers: 123000,
  likes: 2300000,
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
  },
  {
    id: 2,
    title: 'Deep Dive with a Tech Visionary - Podcast #23',
    thumbnailUrl: getImage('video-thumb-2'),
    thumbnailHint: getImageHint('video-thumb-2'),
    views: 89000,
    likes: 7500,
    publishedAt: '1 week ago',
  },
  {
    id: 3,
    title: 'Exploring the Hidden Gems of Southeast Asia',
    thumbnailUrl: getImage('video-thumb-3'),
    thumbnailHint: getImageHint('video-thumb-3'),
    views: 175000,
    likes: 9800,
    publishedAt: '2 weeks ago',
  },
  {
    id: 4,
    title: 'How to Make the Perfect Sourdough Bread at Home',
    thumbnailUrl: getImage('video-thumb-4'),
    thumbnailHint: getImageHint('video-thumb-4'),
    views: 320000,
    likes: 21000,
    publishedAt: '1 month ago',
  },
];
