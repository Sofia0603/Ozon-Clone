import { db } from '@/lib/db';

export async function getAllProducts() {
  try {
    return await db.query.product.findMany({
      with: {
        reviews: true,
      },
    });
  } catch (e) {
    console.log('error fetching product:', e);
    throw e;
  }
}

export async function getAllProductsIds(ids: string[]) {
  if (ids.length === 0) return [];

  return db.query.product.findMany({
    where: (product, { inArray }) => inArray(product.id, ids),
    with: {
      reviews: true,
    },
  });
}
