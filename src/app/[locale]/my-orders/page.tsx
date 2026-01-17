import { getUserOrders } from '@/lib/actions/order';
import { addCurrency } from '@/utils/add-currency';
import { cn } from '@/utils/cn';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Мои заказы',
};

const statusLabels: Record<string, string> = {
  pending: 'В обработке',
  paid: 'Оплачен',
  shipped: 'Отправлен',
  delivered: 'Доставлен',
  canceled: 'Отменен',
};

export default async function Page() {
  const orders = await getUserOrders();
  console.log('orders', orders);

  return (
    <div className="mt-10">
      <h1 className="font-bold text-4xl mb-7">Мои заказы</h1>

      {orders.length ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-black/15 rounded-lg p-6 bg-white"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-xl mb-1">
                    Заказ от{' '}
                    {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                  </h3>
                  <p className="text-sm opacity-50">
                    ID: {order.id.slice(0, 6).toUpperCase()}
                  </p>
                </div>
                <div>
                  <div
                    className={cn(
                      'font-medium',
                      order.status === 'paid'
                        ? 'text-green-600'
                        : order.status === 'canceled'
                          ? 'text-red-600'
                          : order.status === 'delivered'
                            ? 'text-blue-600'
                            : order.status === 'shipped'
                              ? 'text-purple-600'
                              : order.status === 'pending'
                                ? 'text-yellow-600'
                                : ''
                    )}
                  >
                    {statusLabels[order.status] || 'Неизвестен'}
                  </div>
                  <div className="text-xl font-bold">
                    {addCurrency(order.total)}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={60}
                      height={60}
                      draggable={false}
                      className="object-cover rounded-md"
                    />
                    <div>
                      <p className="font-medium text-sm">{item.product.name}</p>
                      <p className="text-sm opacity-50">
                        {item.quantity} (шт.) по{' '}
                        {addCurrency(item.product.price)}
                      </p>
                      <div>
                        Всего: {addCurrency(item.quantity * item.price)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6">У вас еще нет заказов</p>
      )}
    </div>
  );
}
