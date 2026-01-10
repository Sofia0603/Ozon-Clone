import { db } from '@/lib/db';
import { types } from '@/lib/db/schema';

export async function getAllProducts() {
  try {
    return await db.query.product.findMany({
      with: {
        reviews: true
      }
    })
  } catch (e) {
    console.log('error fetching product:', e);
    throw e;
  }
}
