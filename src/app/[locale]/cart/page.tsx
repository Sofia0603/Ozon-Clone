import { getCart } from '@/lib/actions/cart';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Корзина',
};

export default async function Page() {
  const cart = await getCart();

  return (
    <div className="mt-10">
      <h1 className="font-bold text-4xl">Корзина</h1>

      <div className="mt-6">
        {cart.items.length === 0 ? (
          <p>Ваша корзина пуста</p>
        ) : (
          cart.items.map((item) => (

            <div key={item.product.id}>
              {item.product.name} - {item.quantity} шт
            </div>

            
          ))
        )}
      </div>
    </div>
  );
}
