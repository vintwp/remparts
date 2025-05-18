import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
const protectedRoutes = ['/api'];
const publicRoutes = ['/'];

export function middleware(request: NextRequest) {
  console.log('✅ Middleware triggered on:', request.nextUrl.pathname);
  return NextResponse.next();

  // return NextResponse.redirect(new URL('/', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/api/:path((?!signin$|signup$).*)'],
};
