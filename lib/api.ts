import { ApiResponse } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

class ApiClient {
  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const token = this.getAuthToken();
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Handle different response types
      let data;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }
      
      if (!response.ok) {
        throw new Error(data.message || data || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: { email: string; password: string; name: string; phone?: string }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // Jobs endpoints
  async getJobs(params?: Record<string, string | number>) {
    const queryString = params ? new URLSearchParams(params as any).toString() : '';
    return this.request(`/jobs${queryString ? `?${queryString}` : ''}`);
  }

  async getJob(id: number) {
    return this.request(`/jobs/${id}`);
  }

  async createJob(jobData: any) {
    return this.request('/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });
  }

  async updateJob(id: number, jobData: any) {
    return this.request(`/jobs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(jobData),
    });
  }

  async deleteJob(id: number) {
    return this.request(`/jobs/${id}`, {
      method: 'DELETE',
    });
  }

  // Applications endpoints
  async getApplications(params?: Record<string, string | number>) {
    const queryString = params ? new URLSearchParams(params as any).toString() : '';
    return this.request(`/applications${queryString ? `?${queryString}` : ''}`);
  }

  async getApplication(id: number) {
    return this.request(`/applications/${id}`);
  }

  async createApplication(applicationData: any) {
    return this.request('/applications', {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });
  }

  async updateApplication(id: number, applicationData: any) {
    return this.request(`/applications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(applicationData),
    });
  }

  async deleteApplication(id: number) {
    return this.request(`/applications/${id}`, {
      method: 'DELETE',
    });
  }

  // Users endpoints
  async getUsers(params?: Record<string, string | number>) {
    const queryString = params ? new URLSearchParams(params as any).toString() : '';
    return this.request(`/users${queryString ? `?${queryString}` : ''}`);
  }

  async getUser(id: number) {
    return this.request(`/users/${id}`);
  }

  async createUser(userData: any) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(id: number, userData: any) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id: number) {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  // File upload endpoint
  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.request('/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type header to let browser set it with boundary
    });
  }
}

export const apiClient = new ApiClient();

// Helper functions for common operations
export const handleApiError = (error: any) => {
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

export const buildQueryString = (params: Record<string, any>) => {
  const filtered = Object.entries(params).filter(([_, value]) => value !== undefined && value !== null);
  return new URLSearchParams(filtered.map(([key, value]) => [key, String(value)])).toString();
};





