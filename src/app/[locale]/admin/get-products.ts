import { db } from '@/lib/db';
import { product } from '@/lib/db/schema';

export async function getAllProducts() {
  try {
    return await db.select().from(product);
  } catch (e) {
    console.log('error fetching product:', e);
    throw e;
  }
}
