import type { ComponentType } from "react";

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

// Navigation
export interface NavItem {
  label: string;
  path: string;
  Icon: ComponentType<{ color?: string }>;
}

// Domain
export interface Subject {
  id: string;
  name: string;
}

export interface Topic {
  id: string;
  name: string;
  subject_id?: string;
}

export interface SubTopic {
  id: string;
  name: string;
  topic_id?: string;
}

export interface Test {
  id: string;
  name: string;
  type?: string;
  subject: Subject | string;
  topics?: Topic[];
  sub_topics?: SubTopic[];
  status: "live" | null;
  created_at: string;
  difficulty?: string;
  total_marks?: number;
  total_questions?: number;
  total_time?: number;
  correct_marks?: number;
  wrong_marks?: number;
  unattempt_marks?: number;
}

export interface TestsState {
  tests: Test[];
  loading: boolean;
  error: string | null;
}

// UI
export type ViewMode = "grid" | "list";

// API
export interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
}
