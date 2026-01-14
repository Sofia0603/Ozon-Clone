import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { getUser } from './lib/actions/user';
import { PagesConfig } from './config/config.pages';

const intlMiddleware = createMiddleware(routing);

const protectedRoutes = ['/my-orders', 'cart', '/admin'];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;


  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname.startsWith(route) || pathname.includes(route)
  );

  if (isProtectedRoute) {
    let user = null;

    try {
      user = await getUser();
    } catch {
      return NextResponse.redirect(new URL(PagesConfig.HOME, request.url));
    }

    if (!user) {
      return NextResponse.redirect(new URL(PagesConfig.HOME, request.url));
    }
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
