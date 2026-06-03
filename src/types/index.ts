// Auth
export interface LoginFormData {
  userId: string;
  password: string;
}

export interface AuthUser {
  id: string;
  userId: string;
  name?: string;
  role?: string;
}

export interface AuthState {
  token: string | null;
  user: AuthUser | null;
}

// API
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
