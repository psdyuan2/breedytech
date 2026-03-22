import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { SessionData } from '@/lib/session';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const response = NextResponse.next();
    const session = await getIronSession<SessionData>(
      request,
      response,
      {
        password: process.env.SESSION_SECRET!,
        cookieName: 'zobbi-admin-session',
        cookieOptions: {
          secure: process.env.NODE_ENV === 'production',
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7,
        },
      }
    );

    if (!session.userId) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
