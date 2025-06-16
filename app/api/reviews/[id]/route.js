import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function DELETE(request, { params }) {
  try {
    await prisma.review.delete({ where: { id: parseInt(params.id) } });
    return NextResponse.json({ message: 'Yorum silindi' });
  } catch (error) {
    return NextResponse.json({ error: 'Yorum silinemedi' }, { status: 500 });
  }
} 