// App Configuration
export const appConfig = {
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api',
    timeout: 10000,
    maxRetries: 3,
  },
  
  // Authentication
  auth: {
    tokenKey: 'auth_token',
    userKey: 'user_data',
    refreshTokenKey: 'refresh_token',
    tokenExpiry: 24 * 60 * 60 * 1000, // 24 hours
  },
  
  // File Upload
  upload: {
    maxFileSize: parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '5242880'), // 5MB
    allowedTypes: (process.env.NEXT_PUBLIC_ALLOWED_FILE_TYPES || 'application/pdf,image/jpeg,image/png,image/jpg').split(','),
    endpoints: {
      general: '/upload',
      resume: '/upload/resume',
      avatar: '/upload/avatar',
    },
  },
  
  // Pagination
  pagination: {
    defaultPage: 1,
    defaultLimit: 10,
    maxLimit: 100,
  },
  
  // App Info
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'Bodyguard Recruitment',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  },
  
  // Feature Flags
  features: {
    enableRealTimeNotifications: true,
    enableFileUpload: true,
    enableEmailNotifications: true,
    enableSocialLogin: false,
  },
} as const;

// Helper function to get full API URL
export const getApiUrl = (endpoint: string) => {
  return `${appConfig.api.baseUrl}${endpoint}`;
};

// Helper function to check if we're in development
export const isDevelopment = process.env.NODE_ENV === 'development';

// Helper function to check if we're in production
export const isProduction = process.env.NODE_ENV === 'production';

// Helper function to get environment-specific config
export const getEnvironmentConfig = () => {
  return {
    isDevelopment,
    isProduction,
    apiUrl: appConfig.api.baseUrl,
    enableDebug: isDevelopment,
  };
};