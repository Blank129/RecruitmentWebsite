import { NextRequest, NextResponse } from 'next/server';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: number;
    email: string;
    role: string;
  };
}

// Middleware to check authentication
export function withAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (req: AuthenticatedRequest) => {
    try {
      const token = req.headers.get('Authorization')?.replace('Bearer ', '');
      
      if (!token) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'Access token required' 
          },
          { status: 401 }
        );
      }
      
      // TODO: Implement JWT verification
      // For now, we'll use a mock user
      req.user = {
        id: 1,
        email: 'user@example.com',
        role: 'user'
      };
      
      return handler(req);
    } catch (error) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid token' 
        },
        { status: 401 }
      );
    }
  };
}

// Middleware to check if user is admin
export function withAdminAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return withAuth(async (req: AuthenticatedRequest) => {
    if (req.user?.role !== 'admin') {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Admin access required' 
        },
        { status: 403 }
      );
    }
    
    return handler(req);
  });
}

// Middleware for request validation
export function validateRequest(schema: any) {
  return function (handler: (req: NextRequest) => Promise<NextResponse>) {
    return async (req: NextRequest) => {
      try {
        const body = await req.json();
        
        // TODO: Implement validation with Zod or similar
        // const validatedData = schema.parse(body);
        
        return handler(req);
      } catch (error) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'Invalid request data',
            error: error instanceof Error ? error.message : 'Validation failed'
          },
          { status: 400 }
        );
      }
    };
  };
}

// Rate limiting middleware
export function withRateLimit(maxRequests: number = 100, windowMs: number = 60000) {
  const requests = new Map<string, { count: number; resetTime: number }>();
  
  return function (handler: (req: NextRequest) => Promise<NextResponse>) {
    return async (req: NextRequest) => {
      const ip = req.ip || req.headers.get('X-Forwarded-For') || 'unknown';
      const now = Date.now();
      
      const userRequests = requests.get(ip);
      
      if (userRequests) {
        if (now < userRequests.resetTime) {
          if (userRequests.count >= maxRequests) {
            return NextResponse.json(
              { 
                success: false, 
                message: 'Rate limit exceeded' 
              },
              { status: 429 }
            );
          }
          userRequests.count++;
        } else {
          requests.set(ip, { count: 1, resetTime: now + windowMs });
        }
      } else {
        requests.set(ip, { count: 1, resetTime: now + windowMs });
      }
      
      return handler(req);
    };
  };
}

// CORS middleware
export function withCors(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }
    
    const response = await handler(req);
    
    // Add CORS headers to response
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  };
}