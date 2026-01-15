import { getCart } from '@/lib/actions/cart';
import { Metadata } from 'next';
import { CartItem } from './CartItem';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Корзина',
};

export default async function Page() {
  const cart = await getCart();

  return (
    <div className="mt-10">
      <h1 className="font-bold text-4xl">Корзина</h1>

      <div className="mt-6">
        <div className="grid grid-cols-[2.5fr_1fr] gap-5">
          {cart.items.length === 0 ? (
            <p>Ваша корзина пуста</p>
          ) : (
            cart.items.map((item) => (
              <CartItem key={item.product.id} cartItem={item} />
            ))
          )}
        </div>
        <div>
          <Button variant='green' className='w-full'>
            Перейти к оформлению заказа
          </Button>

          <hr />

          {}
          {}
        </div>
      </div>
    </div>
  );
}
