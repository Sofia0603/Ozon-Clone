import Image from 'next/image';
import { Header } from '@/components/layout/header/Header';
import { TopMenu } from '@/components/layout/top-menu/TopMenu';
import { Slider } from '@/components/pages/home/Slider/Slider';
import { getAllProducts } from './admin/get-products';
import { ProductItem } from '@/components/elements/product-item/ProductItem';

export default async function Home() {
  const products = await getAllProducts();
  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-b-3xl">
        <Header />
        <TopMenu />
        <Image
          src="/banner.png"
          alt="Banner"
          width={1407}
          height={94}
          className="mx-auto mt-5"
          draggable={false}
        />
      </div>

      <Slider />

      <div className="grid grid-cols-5 gap-10">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
