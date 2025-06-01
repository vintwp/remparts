import { auth } from '@/shared/config/auth';

const ADMIN_ROUTES = ['/api/admin'];

export default auth(req => {
  const requestedUrl = req.nextUrl.pathname;
  const session = req.auth;
  const role = session?.user?.role;

  if (!session && req.nextUrl.pathname !== '/api/login') {
    const newUrl = new URL('/api/login', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  if (session && ADMIN_ROUTES.includes(requestedUrl) && role !== 'ADMIN') {
    const newUrl = new URL('/forbidden', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: [
    '/api/:path((?!register$|auth/callback$|auth/confirmation(?:/.*)?$|auth/recovery(?:/.*)?$).*)',
  ],
};
