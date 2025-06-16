import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const adminPaths = [
  /^\/admin(\/|$)/,
  /^\/api\/admin(\/|$)/,
  /^\/api\/reviews\/[0-9]+$/ // Yorum silme
];

export async function middleware(request) {
  const { pathname, method } = request.nextUrl;

  // Sadece özel işlemler için method kontrolü
  const isAdminApi = adminPaths.some((re) => re.test(pathname));
  const isContentAdd = pathname.startsWith('/api/admin/contents') && method === 'POST';
  const isReviewDelete = /^\/api\/reviews\/[0-9]+$/.test(pathname) && method === 'DELETE';

  if (pathname.startsWith('/admin') || isAdminApi || isContentAdd || isReviewDelete) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token || token.role !== 'admin') {
      // API isteği ise 403, sayfa ise login'e yönlendir
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 403 });
      } else {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/api/reviews/:path*'
  ]
}; 