import { getUserOrders } from '@/lib/actions/order'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Мои заказы',
};

export default async function Page() {
  const orders = await getUserOrders();

  return (
    <div className='mt-10'>
      <h1 className="font-bold text-4xl">Мои заказы</h1>

      {orders.length ? (
        <div>

        </div>
      ) : (
      <p className='mt-6'>У вас еще нет заказов</p>
      )}
    </div>
  );
}
