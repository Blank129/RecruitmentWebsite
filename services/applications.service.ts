import { apiClient } from '@/lib/api';
import { Application, ApplicationFilters, CreateApplicationRequest, UpdateApplicationRequest } from '@/types/api';

export class ApplicationsService {
  // Get all applications with filtering
  static async getApplications(filters: ApplicationFilters = {}) {
    try {
      const params = this.buildQueryParams(filters);
      const response = await apiClient.getApplications(params);
      
      if (response.success) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch applications');
    } catch (error) {
      throw error;
    }
  }

  // Get single application by ID
  static async getApplication(id: number) {
    try {
      const response = await apiClient.getApplication(id);
      
      if (response.success) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch application');
    } catch (error) {
      throw error;
    }
  }

  // Create new application
  static async createApplication(applicationData: CreateApplicationRequest) {
    try {
      const response = await apiClient.createApplication(applicationData);
      
      if (response.success) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to submit application');
    } catch (error) {
      throw error;
    }
  }

  // Update application
  static async updateApplication(id: number, applicationData: UpdateApplicationRequest) {
    try {
      const response = await apiClient.updateApplication(id, applicationData);
      
      if (response.success) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to update application');
    } catch (error) {
      throw error;
    }
  }

  // Delete application
  static async deleteApplication(id: number) {
    try {
      const response = await apiClient.deleteApplication(id);
      
      if (response.success) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to delete application');
    } catch (error) {
      throw error;
    }
  }

  // Get applications by job ID
  static async getApplicationsByJob(jobId: number) {
    try {
      const response = await apiClient.getApplications({ jobId });
      
      if (response.success) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch job applications');
    } catch (error) {
      throw error;
    }
  }

  // Get applications by user ID
  static async getApplicationsByUser(userId: number) {
    try {
      const response = await apiClient.getApplications({ userId });
      
      if (response.success) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch user applications');
    } catch (error) {
      throw error;
    }
  }

  // Get applications by status
  static async getApplicationsByStatus(status: string) {
    try {
      const response = await apiClient.getApplications({ status });
      
      if (response.success) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch applications by status');
    } catch (error) {
      throw error;
    }
  }

  // Update application status
  static async updateStatus(id: number, status: string, notes?: string) {
    try {
      const response = await apiClient.updateApplication(id, { status, notes });
      
      if (response.success) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to update application status');
    } catch (error) {
      throw error;
    }
  }

  // Get application statistics
  static async getApplicationStats() {
    try {
      // This would typically be a separate endpoint
      const response = await apiClient.getApplications({ limit: 1000 });
      
      if (response.success) {
        const applications = response.data.applications || [];
        
        const stats = {
          total: applications.length,
          pending: applications.filter((app: Application) => app.status === 'pending').length,
          reviewed: applications.filter((app: Application) => app.status === 'reviewed').length,
          approved: applications.filter((app: Application) => app.status === 'approved').length,
          rejected: applications.filter((app: Application) => app.status === 'rejected').length,
        };
        
        return stats;
      }
      
      throw new Error(response.message || 'Failed to fetch application statistics');
    } catch (error) {
      throw error;
    }
  }

  // Private helper method to build query parameters
  private static buildQueryParams(filters: ApplicationFilters & any): Record<string, string | number> {
    const params: Record<string, string | number> = {};
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params[key] = value;
      }
    });
    
    return params;
  }
}