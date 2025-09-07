const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  role: 'student' | 'teacher';
}

export interface RegisterRequest extends LoginRequest {
  name: string;
  confirmPassword: string;
  // Additional fields based on role
  studentId?: string;
  grade?: string;
  department?: string;
  
  qualification?: string;
  experience?: number;
}

export interface AuthResponse {
  user: {
    _id: string;
    username: string;
    email: string;
    name: string;
    role: 'student' | 'teacher';
    avatar?: string;
    // Student-specific fields (only present for students)
    studentId?: string;
    grade?: string;
    rollNumber?: string;
    dateOfBirth?: string;
    guardian?: {
      name?: string;
      email?: string;
      phone?: string;
      relationship?: string;
    };
    // Teacher-specific fields (only present for teachers)
    department?: string;
    qualification?: string;
    experience?: number;
    specialization?: string[];
    // Common fields
    phone?: string;
    address?: {
      street?: string;
      city?: string;
      state?: string;
      zipCode?: string;
      country?: string;
    };
    stats?: any;
    badges?: string[];
    isActive?: boolean;
    isVerified?: boolean;
    preferences?: any;
    createdAt?: string;
    updatedAt?: string;
  };
  token: string;
}

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('auth_token');
    console.log('Getting auth headers, token exists:', !!token);
    if (token) {
      console.log('Token preview:', token.substring(0, 20) + '...');
    }
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    try {
      const data = await response.json();
      
      if (!response.ok) {
        return {
          success: false,
          error: data.message || data.error || 'An error occurred',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Network error or invalid response',
      };
    }
  }

  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(credentials),
      credentials: 'include', // Include cookies for session
    });

    const result = await this.handleResponse<AuthResponse>(response);
    
    if (result.success && result.data?.token) {
      localStorage.setItem('auth_token', result.data.token);
    }

    return result;
  }

  async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(userData),
      credentials: 'include',
    });

    const result = await this.handleResponse<AuthResponse>(response);
    
    if (result.success && result.data?.token) {
      localStorage.setItem('auth_token', result.data.token);
    }

    return result;
  }

  async logout(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      credentials: 'include',
    });

    localStorage.removeItem('auth_token');
    return this.handleResponse(response);
  }

  async getCurrentUser(): Promise<ApiResponse<{ user: AuthResponse['user'], authMethod?: string }>> {
    console.log('Making getCurrentUser request to:', `${API_BASE_URL}/api/auth/me`);
    
    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
      credentials: 'include',
    });

    console.log('getCurrentUser response status:', response.status);
    console.log('getCurrentUser response headers:', Object.fromEntries(response.headers.entries()));

    const result = await this.handleResponse<{ user: AuthResponse['user'], authMethod?: string }>(response);
    console.log('getCurrentUser final result:', result);
    
    return result;
  }

  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      credentials: 'include',
    });

    const result = await this.handleResponse<{ token: string }>(response);
    
    if (result.success && result.data?.token) {
      localStorage.setItem('auth_token', result.data.token);
    }

    return result;
  }

  // Generic API method for other endpoints
  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
      credentials: 'include',
    };

    const response = await fetch(url, config);
    return this.handleResponse<T>(response);
  }
}

export const apiService = new ApiService();
export default apiService;
