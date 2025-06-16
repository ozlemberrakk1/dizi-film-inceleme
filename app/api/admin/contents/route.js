import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '@/app/lib/auth';

const prisma = new PrismaClient();

// Tüm içerikleri getir
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Bu işlem için yetkiniz yok' },
        { status: 403 }
      );
    }

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
    console.error('İçerik listesi hatası:', error);
    return NextResponse.json(
      { error: 'İçerikler listelenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// Yeni içerik ekle
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Bu işlem için yetkiniz yok' },
        { status: 403 }
      );
    }

    const data = await request.json();
    
    // Önce kategoriyi bul veya oluştur
    let category = await prisma.category.findUnique({
      where: { name: data.category || 'Genel' }
    });

    if (!category) {
      category = await prisma.category.create({
        data: { name: data.category || 'Genel' }
      });
    }

    const movie = await prisma.movie.create({
      data: {
        title: data.title,
        description: data.description,
        releaseDate: new Date(data.releaseYear),
        categoryId: category.id,
        imageUrl: data.imageUrl
      },
      include: {
        category: true
      }
    });

    return NextResponse.json({
      message: 'İçerik başarıyla oluşturuldu',
      content: movie
    });
  } catch (error) {
    console.error('İçerik oluşturma hatası:', error);
    return NextResponse.json(
      { error: 'İçerik oluşturulurken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// İçerik güncelle
export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Bu işlem için yetkiniz yok' },
        { status: 403 }
      );
    }

    const { id, ...data } = await request.json();

    // Kategoriyi güncelle veya oluştur
    let category = await prisma.category.findUnique({
      where: { name: data.category || 'Genel' }
    });

    if (!category) {
      category = await prisma.category.create({
        data: { name: data.category || 'Genel' }
      });
    }

    const movie = await prisma.movie.update({
      where: { id: parseInt(id) },
      data: {
        title: data.title,
        description: data.description,
        releaseDate: new Date(data.releaseYear),
        categoryId: category.id,
        imageUrl: data.imageUrl
      },
      include: {
        category: true
      }
    });

    return NextResponse.json({
      message: 'İçerik başarıyla güncellendi',
      content: movie
    });
  } catch (error) {
    console.error('İçerik güncelleme hatası:', error);
    return NextResponse.json(
      { error: 'İçerik güncellenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// İçerik sil
export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Bu işlem için yetkiniz yok' },
        { status: 403 }
      );
    }

    const { id } = await request.json();
    await prisma.movie.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({
      message: 'İçerik başarıyla silindi'
    });
  } catch (error) {
    console.error('İçerik silme hatası:', error);
    return NextResponse.json(
      { error: 'İçerik silinirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 