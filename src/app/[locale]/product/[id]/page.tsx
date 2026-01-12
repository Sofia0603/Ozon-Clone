import { Metadata } from 'next';
import { getAllProductsIds } from '../../admin/get-products';
import { notFound } from 'next/navigation'
import { ProductDetails } from './ProductDetails'

export const metadata: Metadata = {
  title: 'Product details',
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const products = await getAllProductsIds([id]);
  const product = products[0];

	if(!product){
		notFound()
	}

  return <ProductDetails product={product} />
}
