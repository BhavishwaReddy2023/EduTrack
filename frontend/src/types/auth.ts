export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'teacher';
  avatar?: string;
  joinedAt: string;
  stats?: {
    totalAssignments?: number;
    completedAssignments?: number;
    averageScore?: number;
    streak?: number;
    badges?: string[];
    rank?: number;
  };
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'student' | 'teacher') => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

export interface LoginForm {
  email: string;
  password: string;
  role: 'student' | 'teacher';
}

export interface JWT {
  token: string;
  expiresAt: number;
  user: User;
}