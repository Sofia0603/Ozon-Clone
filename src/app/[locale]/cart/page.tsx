import { getUser } from '@/lib/actions/user';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Корзина',
};

export default async function Page() {
  const user = await getUser();

  return (
    <div className="mt-10">
      <h1 className="font-bold text-4xl">Корзина</h1>

      

    </div>
  );
}
