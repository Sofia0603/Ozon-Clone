import { db } from '@/lib/db';

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
