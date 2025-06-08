// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value;

  // Redirect to /signin if trying to access "/" while not logged in
  if (!isLoggedIn && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/', '/home'], // Add any other protected routes here
};