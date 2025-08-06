<!-- # Bodyguard Recruitment API Documentation

## Base URL Configuration
The API base URL is configurable through environment variables:

**Development**: `http://localhost:5000/api`
**Production**: `https://your-backend-domain.com/api`

Set in `.env.local`:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

## Authentication
Most endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## API Endpoints

### Authentication

#### POST /api/auth/login
Login user
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### POST /api/auth/register
Register new user
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "phone": "+84123456789"
}
```

#### POST /api/auth/logout
Logout user (requires authentication)

### Jobs

#### GET /api/jobs
Get all jobs with pagination and filtering
Query parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `search`: Search term
- `location`: Filter by location
- `type`: Filter by job type

#### GET /api/jobs/[id]
Get single job by ID

#### POST /api/jobs
Create new job (requires authentication)
```json
{
  "title": "Personal Bodyguard",
  "company": "Security Corp",
  "location": "Ho Chi Minh City",
  "salary": "$2000-3000",
  "type": "Full-time",
  "description": "Job description...",
  "requirements": ["5+ years experience", "Martial arts background"],
  "benefits": ["Health insurance", "Paid training"]
}
```

#### PUT /api/jobs/[id]
Update job by ID (requires authentication)

#### DELETE /api/jobs/[id]
Delete job by ID (requires authentication)

### Applications

#### GET /api/applications
Get all applications with filtering
Query parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `jobId`: Filter by job ID
- `userId`: Filter by user ID
- `status`: Filter by status (pending, reviewed, approved, rejected)

#### GET /api/applications/[id]
Get single application by ID

#### POST /api/applications
Submit new application
```json
{
  "jobId": 1,
  "applicantName": "John Doe",
  "email": "john@example.com",
  "phone": "+84123456789",
  "experience": "7 years in executive protection",
  "coverLetter": "I am highly experienced...",
  "resume": "path/to/resume.pdf"
}
```

#### PUT /api/applications/[id]
Update application status (requires authentication)
```json
{
  "status": "approved"
}
```

#### DELETE /api/applications/[id]
Delete application by ID (requires authentication)

### Users

#### GET /api/users
Get all users (requires admin authentication)
Query parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `role`: Filter by role

#### GET /api/users/[id]
Get single user by ID (requires authentication)

#### POST /api/users
Create new user (requires admin authentication)
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "role": "user",
  "phone": "+84123456789"
}
```

#### PUT /api/users/[id]
Update user by ID (requires authentication)

#### DELETE /api/users/[id]
Delete user by ID (requires admin authentication)

### File Upload

#### POST /api/upload
Upload file (supports PDF, JPEG, PNG, JPG up to 5MB)
```
Content-Type: multipart/form-data
Body: FormData with 'file' field
```

## Response Format

All API responses follow this format:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

Error responses:
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information"
}
```

## Status Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `409`: Conflict
- `500`: Internal Server Error

## Data Types

### User
```typescript
interface User {
  id: number;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'recruiter';
  phone?: string;
  createdAt: string;
  updatedAt?: string;
}
```

### Job
```typescript
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';
  description: string;
  requirements: string[];
  benefits?: string[];
  createdAt: string;
  updatedAt?: string;
}
```

### Application
```typescript
interface Application {
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
}
```

## Testing

You can test the API endpoints using tools like:
- Postman
- curl
- Browser developer tools

Example curl request:
```bash
curl -X GET http://localhost:3000/api/jobs \
  -H "Authorization: Bearer <your-token>"
```

## Frontend Integration

### Using Services
```typescript
import { AuthService, JobsService, ApplicationsService, UploadService } from '@/services';

// Login
const loginUser = async (email: string, password: string) => {
  try {
    const response = await AuthService.login({ email, password });
    console.log('Login successful:', response.data);
  } catch (error) {
    console.error('Login failed:', error.message);
  }
};

// Get jobs
const fetchJobs = async () => {
  try {
    const jobs = await JobsService.getJobs({ page: 1, limit: 10 });
    console.log('Jobs:', jobs);
  } catch (error) {
    console.error('Failed to fetch jobs:', error.message);
  }
};
```

### Using React Hooks
```typescript
import { useAuth, useJobs, useApplications } from '@/hooks/use-api';

// In component
const MyComponent = () => {
  const { isAuthenticated, user, login, logout } = useAuth();
  const { data: jobs, loading, error } = useJobs().getJobs();
  
  // Component logic...
};
```

### Environment Variables Setup
1. Copy `.env.example` to `.env.local`
2. Update `NEXT_PUBLIC_API_BASE_URL` to your backend URL
3. Configure other environment variables as needed

### Configuration
The API client is configured through `lib/config.ts`:
- Base URL from environment variables
- Authentication token management
- File upload settings
- Pagination defaults

## Next Steps

1. Set up your backend server
2. Update the base URL in `.env.local`
3. Test API endpoints
4. Implement error handling
5. Add loading states
6. Add form validation
7. Implement real-time features -->