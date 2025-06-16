import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '@/app/lib/auth';

const prisma = new PrismaClient();

// Tüm yorumları getir
export async function GET(request) {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: { select: { id: true, name: true } },
        movie: { select: { id: true, title: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: 'Yorumlar alınamadı' }, { status: 500 });
  }
}

// Yorum ekle
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Giriş yapmalısınız' }, { status: 401 });
    }
    const { movieId, content } = await request.json();
    if (!movieId || !content) {
      return NextResponse.json({ error: 'Eksik veri' }, { status: 400 });
    }
    const review = await prisma.review.create({
      data: {
        content,
        userId: session.user.id,
        movieId: parseInt(movieId)
      },
      include: {
        user: { select: { id: true, name: true } }
      }
    });
    return NextResponse.json(review);
  } catch (error) {
    return NextResponse.json({ error: 'Yorum eklenemedi' }, { status: 500 });
  }
} 