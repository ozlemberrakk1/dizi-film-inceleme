import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '@/app/lib/auth';

const prisma = new PrismaClient();

// Tüm mesajları getir (gönderen veya alıcı olarak)
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Giriş yapmalısınız' }, { status: 401 });
    }
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: session.user.id },
          { receiverId: session.user.id }
        ]
      },
      include: {
        sender: { select: { id: true, name: true } },
        receiver: { select: { id: true, name: true } }
      },
      orderBy: { createdAt: 'asc' }
    });
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: 'Mesajlar alınamadı' }, { status: 500 });
  }
}

// Mesaj gönder
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Giriş yapmalısınız' }, { status: 401 });
    }
    const { receiverId, content } = await request.json();
    if (!receiverId || !content) {
      return NextResponse.json({ error: 'Eksik veri' }, { status: 400 });
    }
    const message = await prisma.message.create({
      data: {
        content,
        senderId: session.user.id,
        receiverId: parseInt(receiverId)
      },
      include: {
        sender: { select: { id: true, name: true } },
        receiver: { select: { id: true, name: true } }
      }
    });
    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json({ error: 'Mesaj gönderilemedi' }, { status: 500 });
  }
} 