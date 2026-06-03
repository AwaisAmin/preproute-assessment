// Auth
export interface LoginFormData {
  userId: string;
  password: string;
}

export interface AuthUser {
  id: string;
  userId: string;
  name: string;
  role: string;
  subrole: string | null;
  phone: string;
  joiningDate: string;
  endDate: string;
  lastActive: string;
  payment: boolean;
}

export interface AuthState {
  token: string | null;
  user: AuthUser | null;
}

// API
export interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
}
