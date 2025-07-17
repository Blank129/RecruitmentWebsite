import { apiClient } from '@/lib/api';
import { appConfig } from '@/lib/config';
import { UploadedFile } from '@/types/api';

export class UploadService {
  // Upload general file
  static async uploadFile(file: File): Promise<UploadedFile> {
    try {
      // Validate file before upload
      this.validateFile(file);
      
      const response = await apiClient.uploadFile(file);
      
      if (response.success) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to upload file');
    } catch (error) {
      throw error;
    }
  }

  // Upload resume
  static async uploadResume(file: File): Promise<UploadedFile> {
    try {
      // Validate file (only PDFs for resumes)
      this.validateFile(file, ['application/pdf']);
      
      // Create FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'resume');
      
      const response = await fetch(`${appConfig.api.baseUrl}/upload/resume`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem(appConfig.auth.tokenKey)}`,
        },
        body: formData,
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        return data.data;
      }
      
      throw new Error(data.message || 'Failed to upload resume');
    } catch (error) {
      throw error;
    }
  }

  // Upload avatar
  static async uploadAvatar(file: File): Promise<UploadedFile> {
    try {
      // Validate file (only images for avatars)
      this.validateFile(file, ['image/jpeg', 'image/png', 'image/jpg']);
      
      // Create FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'avatar');
      
      const response = await fetch(`${appConfig.api.baseUrl}/upload/avatar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem(appConfig.auth.tokenKey)}`,
        },
        body: formData,
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        return data.data;
      }
      
      throw new Error(data.message || 'Failed to upload avatar');
    } catch (error) {
      throw error;
    }
  }

  // Upload multiple files
  static async uploadMultipleFiles(files: FileList | File[]): Promise<UploadedFile[]> {
    try {
      const filesArray = Array.from(files);
      const uploadPromises = filesArray.map(file => this.uploadFile(file));
      
      const results = await Promise.allSettled(uploadPromises);
      
      const successfulUploads: UploadedFile[] = [];
      const failedUploads: string[] = [];
      
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          successfulUploads.push(result.value);
        } else {
          failedUploads.push(`${filesArray[index].name}: ${result.reason.message}`);
        }
      });
      
      if (failedUploads.length > 0) {
        console.warn('Some files failed to upload:', failedUploads);
      }
      
      return successfulUploads;
    } catch (error) {
      throw error;
    }
  }

  // Validate file before upload
  private static validateFile(file: File, allowedTypes?: string[]) {
    // Check file size
    if (file.size > appConfig.upload.maxFileSize) {
      throw new Error(`File size exceeds limit of ${this.formatFileSize(appConfig.upload.maxFileSize)}`);
    }
    
    // Check file type
    const typesToCheck = allowedTypes || appConfig.upload.allowedTypes;
    if (!typesToCheck.includes(file.type)) {
      throw new Error(`Invalid file type. Allowed types: ${typesToCheck.join(', ')}`);
    }
    
    // Check file name
    if (!file.name || file.name.length === 0) {
      throw new Error('File name is required');
    }
  }

  // Format file size for display
  private static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Get file extension
  static getFileExtension(filename: string): string {
    return filename.split('.').pop()?.toLowerCase() || '';
  }

  // Check if file is image
  static isImage(file: File): boolean {
    return file.type.startsWith('image/');
  }

  // Check if file is PDF
  static isPDF(file: File): boolean {
    return file.type === 'application/pdf';
  }

  // Generate preview URL for image files
  static generatePreviewUrl(file: File): string {
    if (this.isImage(file)) {
      return URL.createObjectURL(file);
    }
    return '';
  }

  // Clean up preview URL
  static cleanupPreviewUrl(url: string): void {
    if (url) {
      URL.revokeObjectURL(url);
    }
  }
}