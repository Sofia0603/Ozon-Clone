import Image from 'next/image';
import { getAllProducts } from './admin/get-products';
import { ProductItem } from '@/components/elements/product-item/ProductItem';
import { Slider } from '@/components/pages/home/Slider/Slider';

export default async function Home({ children }) {
  const products = await getAllProducts();
  return (
    <>
      <Image
        src="/banner.png"
        alt="Banner"
        width={1407}
        height={94}
        className="mx-auto mt-5"
        draggable={false}
      />

      <Slider />

      <div className="mt-10 mb-20">{children}</div>

      <div className="grid grid-cols-5 gap-10 mt-10 mb-10">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
