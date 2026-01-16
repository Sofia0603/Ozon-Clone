'use client';

import { useTransition } from 'react';
import { createOrder } from '@/lib/actions/order';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { PagesConfig } from '@/config/config.pages';
import { Button } from '@/components/ui/Button';

export function CheckoutButton() {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleCheckout = () => {
    startTransition(async () => {
      const result = await createOrder();

      if (result.success) {
        toast.success('Заказ успешно создан', {id: 'create-order'});
        router.push(PagesConfig.ORDERS);
      } else {
				toast.error('Не удалось создать заказ', {id: 'create-order'});
			}
    });
  };

  return (
    <>
      <Button
        variant="green"
        className="w-full py-3.5"
        onClick={handleCheckout}
				disabled={isPending 	}
      >
       {isPending ? 'Оформление' : ' Перейти к оформлению заказа'}
      </Button>

      <p className="mt-3 mb-6 text-black/30 leading-none font-semibold text-sm">
        Доступные способы и время доставки можно выбрать при оформлении заказа
      </p>
    </>
  );
}
