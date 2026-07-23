export interface User {
  _id: string;
  name: string;
  email: string;
  photoURL: string;
  role: 'user' | 'admin';
  isPro: boolean;
  authProvider: 'local' | 'google';
  createdAt: string;
}

export interface Tool {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  pricing: string;
  website: string;
  thumbnail: string;
  tags: string[];
  features: string[];
  avgRating: number;
  totalReviews: number;
  bookmarkCount: number;
  isFeatured: boolean;
  status: 'pending' | 'approved' | 'rejected';
  submittedBy: {
    _id: string;
    name: string;
    photoURL: string;
  } | string;
  rejectionFeedback?: string;
  aiModel?: string;
  company?: string;
  foundedYear?: number;
  history?: string;
  createdAt: string;
}

export interface Review {
  _id: string;
  toolId: string | { _id: string; title: string };
  userId: string;
  userName: string;
  userEmail: string;
  userPhoto: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Bookmark {
  _id: string;
  userId: string;
  toolId: Tool;
  createdAt: string;
}

export interface Payment {
  _id: string;
  userId: string;
  userEmail: string;
  amount: number;
  transactionId: string;
  status: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  loading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export interface ToolsResponse {
  tools: Tool[];
  total: number;
  page: number;
  totalPages: number;
}

export interface CategoryStat {
  _id: string;
  count: number;
  avgRating: number;
}

export interface AnalyticsData {
  categoryStats: CategoryStat[];
  totalTools: number;
  totalApproved: number;
  totalPending: number;
}

export interface TopContributor {
  _id: string;
  name: string;
  photoURL: string;
  toolCount: number;
}
