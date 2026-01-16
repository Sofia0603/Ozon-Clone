import { getCart } from '@/lib/actions/cart';
import { Metadata } from 'next';
import { CartItem } from './CartItem';
import { Button } from '@/components/ui/Button';
import { addCurrency } from '@/utils/add-currency';
import { CheckoutButton } from './CheckoutButton'

export const metadata: Metadata = {
  title: 'Корзина',
};

export default async function Page() {
  const cart = await getCart();


  return (
    <div className="mt-10">
      <h1 className="font-bold text-4xl">Корзина</h1>

      <div className="mt-7 grid grid-cols-[2.5fr_1fr] gap-5">
        <div className="space-y-5 w-full">
          {cart.items.length === 0 ? (
            <p>Ваша корзина пуста</p>
          ) : (
            cart.items.map((item) => (
              <CartItem key={item.product.id} cartItem={item} />
            ))
          )}
        </div>
        <div className="bg-white px-4 py-6 rounded-xl h-max">
          <CheckoutButton />

          <hr className="opacity-10" />

          <div className="mt-4 flex flex-col gap-3">
            <div className="flex justify-between">
              <span>Товары ({cart.count})</span>
              <span className="font-bold">{addCurrency(cart.total)}</span>
            </div>
            {cart.totalDiscount > 0 && (
              <>
                <div className="justify-between flex">
                  <span>Скидка</span>
                  <span className="text-secondary font-bold">
                    -{addCurrency(cart.totalDiscount)}
                  </span>
                </div>
                <hr className="opacity-10" />
              </>
            )}
            <div className="flex justify-between font-bold text-2xl">
              <span>Итого</span>
              <span className="text-green-500">{addCurrency(cart.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
