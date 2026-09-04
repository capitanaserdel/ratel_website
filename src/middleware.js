import { NextResponse } from 'next/server';

const BLOCKED = {
  '/personal-subscribers': '/coming-soon?service=register',
};

export function middleware(request) {
  if (process.env.MAINTENANCE_MODE !== 'true') return NextResponse.next();

  const dest = BLOCKED[request.nextUrl.pathname];
  if (dest) {
    return NextResponse.redirect(new URL(dest, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/personal-subscribers'],
};
