import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routes } from './lib/routes';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};

const publicPaths = [routes.login, routes.register];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define paths that are considered public (accessible without a token)
  const isPublicPath = publicPaths.some((e) => path.startsWith(e));

  // Get the token from the cookies
  const token = request.cookies.get('token')?.value || '';

  // Redirect logic based on the path and token presence
  if (isPublicPath && token) {
    // If trying to access a public path with a token, redirect to the home page
    return NextResponse.redirect(new URL(routes._, request.nextUrl));
  }

  // If trying to access a protected path without a token, redirect to the login page
  if (!isPublicPath) {
    if (!token) {
      return NextResponse.redirect(new URL(routes.login, request.nextUrl));
    }
    if (!Object.values(routes).find((e) => path === e)) {
      return NextResponse.redirect(new URL(routes.dashboard, request.nextUrl));
    }
  }
}
