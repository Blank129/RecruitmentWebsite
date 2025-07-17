import { apiClient } from '@/lib/api';
import { appConfig } from '@/lib/config';
import { LoginRequest, RegisterRequest, AuthUser } from '@/types/api';

export class AuthService {
  // Login user
  static async login(credentials: LoginRequest) {
    try {
      const response = await apiClient.login(credentials.email, credentials.password);
      
      if (response.success && response.data) {
        // Store token and user data
        localStorage.setItem(appConfig.auth.tokenKey, response.data.token);
        localStorage.setItem(appConfig.auth.userKey, JSON.stringify(response.data.user));
        
        return response;
      }
      
      throw new Error(response.message || 'Login failed');
    } catch (error) {
      throw error;
    }
  }

  // Register user
  static async register(userData: RegisterRequest) {
    try {
      const response = await apiClient.register(userData);
      
      if (response.success && response.data) {
        // Store token and user data
        localStorage.setItem(appConfig.auth.tokenKey, response.data.token);
        localStorage.setItem(appConfig.auth.userKey, JSON.stringify(response.data.user));
        
        return response;
      }
      
      throw new Error(response.message || 'Registration failed');
    } catch (error) {
      throw error;
    }
  }

  // Logout user
  static async logout() {
    try {
      await apiClient.logout();
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API call failed:', error);
    } finally {
      // Clear local storage
      localStorage.removeItem(appConfig.auth.tokenKey);
      localStorage.removeItem(appConfig.auth.userKey);
      localStorage.removeItem(appConfig.auth.refreshTokenKey);
    }
  }

  // Get current user from localStorage
  static getCurrentUser(): AuthUser | null {
    try {
      const userData = localStorage.getItem(appConfig.auth.userKey);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  // Get auth token
  static getToken(): string | null {
    return localStorage.getItem(appConfig.auth.tokenKey);
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getCurrentUser();
    return !!(token && user);
  }

  // Check if user has specific role
  static hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  // Check if user is admin
  static isAdmin(): boolean {
    return this.hasRole('admin');
  }

  // Check if user is recruiter
  static isRecruiter(): boolean {
    return this.hasRole('recruiter');
  }

  // Clear auth data
  static clearAuth(): void {
    localStorage.removeItem(appConfig.auth.tokenKey);
    localStorage.removeItem(appConfig.auth.userKey);
    localStorage.removeItem(appConfig.auth.refreshTokenKey);
  }
}