// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationData;
}

// User Types
export interface User {
  id: number;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'recruiter';
  phone?: string;
  profile?: UserProfile;
  createdAt: string;
  updatedAt?: string;
}

export interface UserProfile {
  bio?: string;
  experience?: string;
  skills?: string[];
  certifications?: string[];
  avatar?: string;
}

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: string;
  token?: string;
}

// Job Types
export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';
  description: string;
  requirements: string[];
  benefits?: string[];
  status?: 'active' | 'inactive' | 'closed';
  createdAt: string;
  updatedAt?: string;
}

export interface JobFilters {
  search?: string;
  location?: string;
  type?: string;
  salary?: string;
  page?: number;
  limit?: number;
}

// Application Types
export interface Application {
  id: number;
  jobId: number;
  userId: number;
  applicantName: string;
  email: string;
  phone: string;
  experience: string;
  coverLetter: string;
  resume: string;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  appliedAt: string;
  updatedAt?: string;
  job?: Job;
  user?: User;
}

export interface ApplicationFilters {
  jobId?: number;
  userId?: number;
  status?: string;
  page?: number;
  limit?: number;
}

// File Upload Types
export interface UploadedFile {
  filename: string;
  originalName: string;
  size: number;
  type: string;
  url: string;
}

// Request Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface CreateJobRequest {
  title: string;
  company: string;
  location: string;
  salary: string;
  type: Job['type'];
  description: string;
  requirements: string[];
  benefits?: string[];
}

export interface CreateApplicationRequest {
  jobId: number;
  applicantName: string;
  email: string;
  phone: string;
  experience: string;
  coverLetter: string;
  resume: string;
}

export interface UpdateApplicationRequest {
  status: Application['status'];
  notes?: string;
}