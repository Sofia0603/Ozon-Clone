import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/lib/db';
import { review } from '@/lib/db/schema';

export async function POST(req: NextRequest) {
  try {
    const { productId, userId, rating, comment } = await req.json();

    if (!productId || !userId || !rating) {
      return NextResponse.json(
        { error: 'productId, userId и rating обязательны' },
        { status: 400 }
      );
    }

    const id = crypto.randomUUID();

    await db.insert(review).values({
      id,
      productId,
      userId,
      rating,
      comment: comment || '',
      createdAt: Date.now(),
    });

    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
