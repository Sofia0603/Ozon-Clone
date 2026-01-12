'use server';

import { db } from '../db';

export async function getProductsByIds(ids: string[]) {
  if (ids.length === 0) return [];

  return db.query.product.findMany({
    where: (product, { inArray }) => inArray(product.id, ids),
    wuth: {
      reviews: true,
    },
  });
}
