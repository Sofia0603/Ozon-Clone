'use server';

import { eq } from 'drizzle-orm';
import { db } from '../db';
import { getUser } from './user';
import { cart, order, orderItem } from '../db/schema';
import { revalidatePath } from 'next/cache';
import { PagesConfig } from '@/config/config.pages';

export async function createOrder() {
  try {
    const user = await getUser();

    const userId = user.id;

    const userCart = await db.query.cart.findFirst({
      where: eq(cart.userId, userId),
      with: {
        items: {
          with: {
            product: true,
          },
        },
      },
    });

    if (!userCart || userCart.items.length === 0) {
      return {
        success: false,
        message: 'Корзина пуста',
      };
    }

    const total = userCart.items.reduce((acc, item) => {
      const price = item.product.discountPrice || item.product.price;
      return acc + price * item.quantity;
    }, 0);

    const [newOrder] = await db
      .insert(order)
      .values({
        id: crypto.randomUUID,
        userId,
        total,
        status: 'paid',
      })
      .returning();

    for (const item of userCart.items) {
      await db.insert(orderItem).values({
        id: crypto.randomUUID,
        orderId: newOrder.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.product.discountPrice || item.product.price,
      });
    }

    await db.delete(cart).where(eq(cart.id, userCart.id));

    revalidatePath(PagesConfig.CART);
    revalidatePath(PagesConfig.ORDERS);
    return {
      success: true,
    };
  } catch (error) {
    console.log('create order error', error);

    return {
      success: false,
      message: 'Ошибка при создании заказа',
    };
  }
}

export async function getUserOrders() {
  try {
    const user = await getUser();

    const orders =  await db.query.order.findMany({
			where: eq(order.userId, user.id),
			with: {
				items: {
					with: {
						product: true
					}
				}
			},
			orderBy: (order, {desc}) => [desc(order.createdAt)]
		})

		return orders

  } catch {
    return []
  }
}
