// Export all services
export { AuthService } from './auth.service';
export { JobsService } from './jobs.service';
export { ApplicationsService } from './applications.service';
export { UploadService } from './upload.service';

// Re-export API client for direct use
export { apiClient } from '@/lib/api';

// Re-export configuration
export { appConfig } from '@/lib/config';

// Utility functions
export const services = {
  auth: AuthService,
  jobs: JobsService,
  applications: ApplicationsService,
  upload: UploadService,
};

// Common error handler
export const handleServiceError = (error: any): string => {
  if (error?.message) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'An unexpected error occurred';
};

// Helper function to check if error is authentication related
export const isAuthError = (error: any): boolean => {
  const errorMessage = error?.message || error || '';
  return errorMessage.includes('token') || 
         errorMessage.includes('auth') || 
         errorMessage.includes('unauthorized') ||
         errorMessage.includes('401');
};

// Helper function to check if error is permission related
export const isPermissionError = (error: any): boolean => {
  const errorMessage = error?.message || error || '';
  return errorMessage.includes('permission') || 
         errorMessage.includes('forbidden') ||
         errorMessage.includes('403');
};

// Helper function to check if error is network related
export const isNetworkError = (error: any): boolean => {
  const errorMessage = error?.message || error || '';
  return errorMessage.includes('network') || 
         errorMessage.includes('fetch') ||
         errorMessage.includes('connection') ||
         errorMessage.includes('timeout');
};