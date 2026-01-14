import { Metadata } from 'next';
import { getAllProductsIds } from '../../admin/get-products';
import { notFound } from 'next/navigation';
import { ProductDetails } from './ProductDetails';
import { getCart } from '@/lib/actions/cart';

export const metadata: Metadata = {
  title: 'Product details',
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const products = await getAllProductsIds([id]);
  const product = products[0];

  if (!product) {
    notFound();
  }

  const cart = await getCart();
  const quantityInCart =
    cart.items.find((item) => item.product.id === product.id)?.quantity || 0;

  return <ProductDetails product={product} quantityInCart={quantityInCart} />;
}
