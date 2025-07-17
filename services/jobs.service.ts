import { apiClient } from '@/lib/api';
import { Job, JobFilters, CreateJobRequest } from '@/types/api';

export class JobsService {
  // Get all jobs with filtering
  static async getJobs(filters: JobFilters = {}) {
    try {
      const params = this.buildQueryParams(filters);
      const response = await apiClient.getJobs(params);
      
      if (response.success) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch jobs');
    } catch (error) {
      throw error;
    }
  }

  // Get single job by ID
  static async getJob(id: number) {
    try {
      const response = await apiClient.getJob(id);
      
      if (response.success) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch job');
    } catch (error) {
      throw error;
    }
  }

  // Create new job
  static async createJob(jobData: CreateJobRequest) {
    try {
      const response = await apiClient.createJob(jobData);
      
      if (response.success) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to create job');
    } catch (error) {
      throw error;
    }
  }

  // Update job
  static async updateJob(id: number, jobData: Partial<CreateJobRequest>) {
    try {
      const response = await apiClient.updateJob(id, jobData);
      
      if (response.success) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to update job');
    } catch (error) {
      throw error;
    }
  }

  // Delete job
  static async deleteJob(id: number) {
    try {
      const response = await apiClient.deleteJob(id);
      
      if (response.success) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to delete job');
    } catch (error) {
      throw error;
    }
  }

  // Search jobs
  static async searchJobs(query: string, filters: JobFilters = {}) {
    try {
      const params = this.buildQueryParams({ ...filters, search: query });
      const response = await apiClient.getJobs(params);
      
      if (response.success) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to search jobs');
    } catch (error) {
      throw error;
    }
  }

  // Get featured jobs
  static async getFeaturedJobs() {
    try {
      const params = this.buildQueryParams({ featured: true, limit: 6 });
      const response = await apiClient.getJobs(params);
      
      if (response.success) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch featured jobs');
    } catch (error) {
      throw error;
    }
  }

  // Get recent jobs
  static async getRecentJobs(limit: number = 10) {
    try {
      const params = this.buildQueryParams({ limit, sort: 'createdAt', order: 'desc' });
      const response = await apiClient.getJobs(params);
      
      if (response.success) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch recent jobs');
    } catch (error) {
      throw error;
    }
  }

  // Private helper method to build query parameters
  private static buildQueryParams(filters: JobFilters & any): Record<string, string | number> {
    const params: Record<string, string | number> = {};
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params[key] = value;
      }
    });
    
    return params;
  }
}