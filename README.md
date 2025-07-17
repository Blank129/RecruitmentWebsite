# Bodyguard Recruitment Platform

A modern web application for bodyguard recruitment built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 🔐 Authentication & Authorization
- 💼 Job Posting & Management
- 📝 Application System
- 👥 User Management
- 📎 File Upload (CV, Documents)
- 📱 Responsive Design
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui
- **State Management**: React Hooks, Context API
- **API Client**: Fetch API with custom wrapper
- **Authentication**: JWT (configurable)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm
- Backend API server (separate repository)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd bodyguard-recruitment
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

4. Update the environment variables in `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
NEXT_PUBLIC_JWT_SECRET=your-jwt-secret
```

5. Start the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── about/             # About page
│   ├── apply/             # Application page
│   ├── contact/           # Contact page
│   ├── jobs/              # Jobs listing
│   ├── services/          # Services page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/                # Shadcn/ui components
│   ├── header.tsx         # Header component
│   └── footer.tsx         # Footer component
├── hooks/                 # Custom React hooks
│   ├── use-api.ts         # API hooks
│   ├── use-mobile.tsx     # Mobile detection
│   └── use-toast.ts       # Toast notifications
├── lib/                   # Utility libraries
│   ├── api.ts             # API client
│   ├── config.ts          # App configuration
│   ├── constants.ts       # Constants
│   ├── middleware.ts      # API middleware
│   └── utils.ts           # Utility functions
├── services/              # API services
│   ├── auth.service.ts    # Authentication
│   ├── jobs.service.ts    # Jobs management
│   ├── applications.service.ts # Applications
│   ├── upload.service.ts  # File upload
│   └── index.ts           # Service exports
├── styles/                # Global styles
├── types/                 # TypeScript types
│   └── api.ts             # API types
└── public/                # Static assets
```

## API Integration

### Configuration

The API client is configured in `lib/config.ts` and can be customized through environment variables:

```typescript
export const appConfig = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api',
    timeout: 10000,
    maxRetries: 3,
  },
  // ... other configurations
};
```

### Using Services

```typescript
import { AuthService, JobsService, ApplicationsService } from '@/services';

// Authentication
const user = await AuthService.login({ email, password });

// Jobs
const jobs = await JobsService.getJobs({ page: 1, limit: 10 });

// Applications
const application = await ApplicationsService.createApplication(applicationData);
```

### Using React Hooks

```typescript
import { useAuth, useJobs } from '@/hooks/use-api';

const MyComponent = () => {
  const { isAuthenticated, user, login, logout } = useAuth();
  const { data: jobs, loading, error } = useJobs().getJobs();
  
  // Component logic...
};
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL | `http://localhost:5000/api` |
| `NEXT_PUBLIC_JWT_SECRET` | JWT secret key | - |
| `NEXT_PUBLIC_MAX_FILE_SIZE` | Max file upload size (bytes) | `5242880` (5MB) |
| `NEXT_PUBLIC_ALLOWED_FILE_TYPES` | Allowed file types | `application/pdf,image/jpeg,image/png,image/jpg` |
| `NEXT_PUBLIC_APP_NAME` | Application name | `Bodyguard Recruitment` |
| `NEXT_PUBLIC_APP_VERSION` | Application version | `1.0.0` |

## API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed API documentation.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@example.com or join our Slack channel.

## Backend Setup

This frontend application requires a separate backend API server. Make sure to:

1. Set up your backend server
2. Update the `NEXT_PUBLIC_API_BASE_URL` in `.env.local`
3. Ensure CORS is configured properly on your backend
4. Implement the required API endpoints as documented in `API_DOCUMENTATION.md`