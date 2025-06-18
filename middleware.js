import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const adminPaths = [
  /^\/admin(\/|$)/,
  /^\/api\/admin(\/|$)/,
  /^\/api\/reviews\/[0-9]+$/ // yorum silme gibi
];

const authPaths = [
  /^\/api\/users(\/|$)/,  // genel kullanıcılar için
  /^\/api\/messages(\/|$)/
];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Admin-only endpoint kontrolü
  if (adminPaths.some(re => re.test(pathname))) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token || token.role !== 'admin') {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Yetkisiz erişim - Admin olmalısınız' }, { status: 403 });
      }
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  // Giriş yapılması gereken endpoint kontrolü
  else if (authPaths.some(re => re.test(pathname))) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Yetkisiz erişim - Giriş yapmalısınız' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/api/reviews/:path*',
    '/api/users/:path*',
    '/api/messages/:path*'
  ]
};
