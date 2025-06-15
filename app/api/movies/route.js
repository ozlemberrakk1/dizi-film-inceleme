import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const movies = await prisma.movie.findMany({
      include: {
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(movies);
  } catch (error) {
    console.error('Film listesi hatası:', error);
    return NextResponse.json(
      { error: 'Filmler listelenirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 