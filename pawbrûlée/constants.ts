import { User, UserRole, Post, DonationCampaign, Story, ChatSession, ServiceListing, UrgencyLevel, MapPin, AppNotification } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  username: 'arya_stark',
  fullName: 'Arya Stark',
  avatar: 'https://picsum.photos/id/64/200/200',
  role: UserRole.USER,
  isVerified: true,
  location: 'Mumbai, India',
  bio: 'Dog mom & Rescue volunteer 🐾',
  stats: { posts: 42, followers: 850, following: 120 }
};

export const MOCK_STORIES: Story[] = [
  { id: 's1', userId: 'u2', username: 'paws_ngo', avatar: 'https://picsum.photos/id/1025/200/200', hasUnseen: true, imageUrl: 'https://picsum.photos/id/237/400/800' },
  { id: 's2', userId: 'u3', username: 'dr_dolittle', avatar: 'https://picsum.photos/id/1012/200/200', hasUnseen: true, imageUrl: 'https://picsum.photos/id/1025/400/800' },
  { id: 's3', userId: 'u4', username: 'cat_lovers', avatar: 'https://picsum.photos/id/40/200/200', hasUnseen: false, imageUrl: 'https://picsum.photos/id/219/400/800' },
];

export const MOCK_POSTS: (Post | DonationCampaign)[] = [
  {
    id: 'p1',
    userId: 'u2',
    user: { id: 'u2', username: 'paws_ngo', fullName: 'PAWS Rescue', avatar: 'https://picsum.photos/id/1025/200/200', role: UserRole.NGO, isVerified: true, isNgoVerified: true, stats: {posts:0, followers:0, following:0} },
    type: 'donation',
    title: 'Urgent Surgery for Max',
    caption: 'Max was found with a broken leg near the highway. He needs immediate orthopedic surgery. Every bit helps!',
    imageUrl: 'https://picsum.photos/id/169/600/400',
    likes: 1204,
    comments: 45,
    timestamp: '2h ago',
    targetAmount: 50000,
    raisedAmount: 32500,
    daysLeft: 2,
    urgency: UrgencyLevel.CRITICAL,
    legitimacyScore: 98,
    geoVerified: true,
    location: 'Bandra West, Mumbai'
  },
  {
    id: 'p2',
    userId: 'u5',
    user: { id: 'u5', username: 'beagle_life', fullName: 'Benny the Beagle', avatar: 'https://picsum.photos/id/1062/200/200', role: UserRole.USER, isVerified: false, stats: {posts:0, followers:0, following:0} },
    type: 'regular',
    caption: 'Sunday funday at the park! 🌳🎾',
    imageUrl: 'https://picsum.photos/id/1084/600/600',
    likes: 85,
    comments: 12,
    timestamp: '4h ago',
    location: 'Cubbon Park, Bangalore'
  },
  {
    id: 'p3',
    userId: 'u3',
    user: { id: 'u3', username: 'dr_dolittle', fullName: 'Dr. John', avatar: 'https://picsum.photos/id/1012/200/200', role: UserRole.VET, isVerified: true, stats: {posts:0, followers:0, following:0} },
    type: 'regular',
    caption: 'Remember to keep your pets hydrated this summer! ☀️💧',
    imageUrl: 'https://picsum.photos/id/582/600/400',
    likes: 450,
    comments: 20,
    timestamp: '1d ago',
  }
];

export const MOCK_CHATS: ChatSession[] = [
  { id: 'c1', otherUser: { id: 'bot', fullName: 'Vet AI Assistant', avatar: 'https://picsum.photos/id/999/200/200' }, lastMessage: 'How can I help with your pet today?', unreadCount: 0, timestamp: 'Now', isAiBot: true },
  { id: 'c2', otherUser: { id: 'u2', fullName: 'PAWS Rescue', avatar: 'https://picsum.photos/id/1025/200/200' }, lastMessage: 'Thank you for your donation!', unreadCount: 1, timestamp: '10m' },
  { id: 'c3', otherUser: { id: 'u6', fullName: 'Sarah Jenkins', avatar: 'https://picsum.photos/id/338/200/200' }, lastMessage: 'Is the puppy still available?', unreadCount: 0, timestamp: '1d' },
];

export const MOCK_SERVICES: ServiceListing[] = [
  { id: 'sv1', title: 'Professional Dog Walking', provider: CURRENT_USER, rating: 4.8, reviews: 120, price: '₹300/hr', category: 'Sitting', imageUrl: 'https://picsum.photos/id/237/300/200' },
  { id: 'sv2', title: 'Mobile Grooming Spa', provider: CURRENT_USER, rating: 4.9, reviews: 85, price: '₹1200', category: 'Grooming', imageUrl: 'https://picsum.photos/id/1025/300/200' },
];

export const MOCK_PINS: MapPin[] = [
  { id: 'mp1', lat: 40, lng: 40, title: 'Happy Paws Rescue', type: 'rescue', status: 'open' },
  { id: 'mp2', lat: 60, lng: 70, title: 'City Vet Clinic', type: 'vet', status: 'open' },
  { id: 'mp3', lat: 20, lng: 30, title: 'Animal Shelter North', type: 'ngo', status: 'emergency' },
  { id: 'mp4', lat: 80, lng: 20, title: 'South Side Vet', type: 'vet', status: 'open' },
  { id: 'mp5', lat: 30, lng: 80, title: 'K9 Training Center', type: 'ngo', status: 'open' },
];

export const MOCK_REELS = [
  {
    id: 'r1',
    user: { username: 'golden_retriever_fan', avatar: 'https://picsum.photos/id/1025/100/100' },
    videoUrl: 'https://picsum.photos/id/237/400/800', // Using image for mock
    caption: 'Best friends forever! 🐶🐱 #cute #pets',
    likes: '12.5K',
    comments: '102',
    song: 'Original Audio - golden_fan'
  },
  {
    id: 'r2',
    user: { username: 'rescue_hero', avatar: 'https://picsum.photos/id/1025/100/100' },
    videoUrl: 'https://picsum.photos/id/1025/400/800', 
    caption: 'Transformation Tuesday! Look at him now. ❤️',
    likes: '45K',
    comments: '890',
    song: 'Hero - Mariah Carey'
  },
  {
    id: 'r3',
    user: { username: 'funny_cats', avatar: 'https://picsum.photos/id/40/100/100' },
    videoUrl: 'https://picsum.photos/id/219/400/800', 
    caption: 'Why is he like this? 😂',
    likes: '8.2K',
    comments: '45',
    song: 'Funny Song - TikTok Tunes'
  }
];

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    type: 'alert',
    message: 'SOS: Injured dog reported within 2km of your location.',
    timestamp: '2m ago',
    isRead: false
  },
  {
    id: 'n2',
    type: 'like',
    user: { username: 'paws_ngo', avatar: 'https://picsum.photos/id/1025/200/200' },
    message: 'liked your donation campaign.',
    timestamp: '15m ago',
    isRead: false
  },
  {
    id: 'n3',
    type: 'follow',
    user: { username: 'dr_dolittle', avatar: 'https://picsum.photos/id/1012/200/200' },
    message: 'started following you.',
    timestamp: '2h ago',
    isRead: true
  },
  {
    id: 'n4',
    type: 'system',
    message: 'Welcome to Pawbrûlée! Complete your profile to get verified.',
    timestamp: '1d ago',
    isRead: true
  }
];