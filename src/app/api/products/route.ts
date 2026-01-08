import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/lib/db';
import { product } from '@/lib/db/schema';
import { eq } from 'drizzle-orm'

export async function GET() {
  try {
    const products = await db.select().from(product);
    return NextResponse.json(products);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, description, price, discountPrice, imageUrl } = await req.json();

    if (!name || !price || !imageUrl) {
      return NextResponse.json(
        { error: 'name, price и imageUrl обязательны' },
        { status: 400 }
      );
    }

    const id = crypto.randomUUID();

    await db.insert(product).values({
      id,
      name,
      description: description || '',
      price,
      discountPrice: discountPrice || null,
      imageUrl,
      createdAt: Date.now(),
    });

    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID не указан' }, { status: 400 });
    }

    await db.delete(product).where(eq(product.id, id));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}