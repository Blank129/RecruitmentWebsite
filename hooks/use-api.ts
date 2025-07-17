import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';
import { ApiResponse } from '@/types/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

// Generic hook for API calls
export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  options: UseApiOptions = {}
) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await apiCall();
      setState({ data: response.data, loading: false, error: null });
      
      if (options.onSuccess) {
        options.onSuccess(response.data);
      }
      
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setState({ data: null, loading: false, error: errorMessage });
      
      if (options.onError) {
        options.onError(errorMessage);
      }
      
      throw error;
    }
  };

  useEffect(() => {
    if (options.immediate) {
      execute();
    }
  }, []);

  return {
    ...state,
    execute,
    refetch: execute,
  };
}

// Hook for authentication
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
    
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.login(email, password);
      
      if (response.success && response.data) {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user_data', JSON.stringify(response.data.user));
        setIsAuthenticated(true);
        setUser(response.data.user);
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
      const response = await apiClient.register(userData);
      
      if (response.success && response.data) {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user_data', JSON.stringify(response.data.user));
        setIsAuthenticated(true);
        setUser(response.data.user);
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      // Continue with logout even if API call fails
    }
    
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setIsAuthenticated(false);
    setUser(null);
  };

  return {
    isAuthenticated,
    user,
    loading,
    login,
    register,
    logout,
  };
}

// Hook for jobs
export function useJobs() {
  const getJobs = (params?: any) => {
    return useApi(() => apiClient.getJobs(params));
  };

  const getJob = (id: number) => {
    return useApi(() => apiClient.getJob(id));
  };

  const createJob = () => {
    return useApi(() => Promise.resolve({ success: true, data: null }), { immediate: false });
  };

  const updateJob = () => {
    return useApi(() => Promise.resolve({ success: true, data: null }), { immediate: false });
  };

  const deleteJob = () => {
    return useApi(() => Promise.resolve({ success: true, data: null }), { immediate: false });
  };

  return {
    getJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
  };
}

// Hook for applications
export function useApplications() {
  const getApplications = (params?: any) => {
    return useApi(() => apiClient.getApplications(params));
  };

  const getApplication = (id: number) => {
    return useApi(() => apiClient.getApplication(id));
  };

  const createApplication = () => {
    return useApi(() => Promise.resolve({ success: true, data: null }), { immediate: false });
  };

  const updateApplication = () => {
    return useApi(() => Promise.resolve({ success: true, data: null }), { immediate: false });
  };

  const deleteApplication = () => {
    return useApi(() => Promise.resolve({ success: true, data: null }), { immediate: false });
  };

  return {
    getApplications,
    getApplication,
    createApplication,
    updateApplication,
    deleteApplication,
  };
}

// Hook for users
export function useUsers() {
  const getUsers = (params?: any) => {
    return useApi(() => apiClient.getUsers(params));
  };

  const getUser = (id: number) => {
    return useApi(() => apiClient.getUser(id));
  };

  const createUser = () => {
    return useApi(() => Promise.resolve({ success: true, data: null }), { immediate: false });
  };

  const updateUser = () => {
    return useApi(() => Promise.resolve({ success: true, data: null }), { immediate: false });
  };

  const deleteUser = () => {
    return useApi(() => Promise.resolve({ success: true, data: null }), { immediate: false });
  };

  return {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
  };
}

// Hook for file upload
export function useFileUpload() {
  const uploadFile = () => {
    return useApi(() => Promise.resolve({ success: true, data: null }), { immediate: false });
  };

  return {
    uploadFile,
  };
}