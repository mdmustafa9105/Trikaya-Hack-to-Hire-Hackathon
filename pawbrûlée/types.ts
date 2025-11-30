export enum UserRole {
  USER = 'USER',
  NGO = 'NGO',
  VET = 'VET'
}

export enum UrgencyLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical'
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  role: UserRole;
  isVerified: boolean; // Aadhaar verified
  isNgoVerified?: boolean;
  location?: string;
  bio?: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  type: 'regular' | 'donation';
  location?: string;
}

export interface DonationCampaign extends Post {
  type: 'donation';
  targetAmount: number;
  raisedAmount: number;
  daysLeft: number;
  urgency: UrgencyLevel;
  legitimacyScore: number; // 0-100
  geoVerified: boolean;
  title: string;
}

export interface Story {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  hasUnseen: boolean;
  imageUrl: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  isAi?: boolean;
}

export interface ChatSession {
  id: string;
  otherUser: User | { fullName: string; avatar: string; id: string }; // Can be AI
  lastMessage: string;
  unreadCount: number;
  timestamp: string;
  isAiBot?: boolean;
}

export interface ServiceListing {
  id: string;
  title: string;
  provider: User;
  rating: number;
  reviews: number;
  price: string;
  imageUrl: string;
  category: 'Sitting' | 'Grooming' | 'Training' | 'Vet';
}

export interface MapPin {
  id: string;
  lat: number;
  lng: number;
  title: string;
  type: 'rescue' | 'vet' | 'ngo';
  status: 'open' | 'closed' | 'emergency';
}

export interface AppNotification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'alert' | 'system';
  message: string;
  timestamp: string;
  isRead: boolean;
  user?: {
    username: string;
    avatar: string;
  };
}