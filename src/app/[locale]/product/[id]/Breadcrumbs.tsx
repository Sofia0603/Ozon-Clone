import { ChartBarStacked, Copy, Forward } from 'lucide-react';
import { TProductWithReviews } from '@/lib/db/types'

const crumbs = ['Красота и здоровье', 'Обувь', 'Уги'];

const menu = [
  {
    icon: Copy,
    label: 'Артикул: 123456789',
  },
  {
    icon: ChartBarStacked,
    label: 'В сравнение',
  },
  {
    icon: Forward,
    label: 'Поделиться',
  },
];

interface Props {
  product: TProductWithReviews
}


export function Breadcrumbs({product}: Props) {
  return (
    <div className='font-medium flex items-center justify-between'>
      <div className="flex items-center gap-2 text-sm text-neutral-500">
        {crumbs.map((crumb, index) => (
					<span className="flex items-center gap-2" key={index}>
            {crumb}
            {index < crumbs.length + 1 && <span className="w-1 h-1 bg-neutral-400 rounded-full" />}
          </span>
				))}
        <span className="flex items-center gap-2">
            {product.name}
          </span>
      </div>

			<div className='flex items-center gap-6 mt-4'>
				{menu.map((item, index) => (
					<button
						key={index}
						className='flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-600 transition-colors'
						>
						<item.icon size={13}/>
						<span>{item.label}</span>
					</button>
				))}
			</div>

    </div>
  );
}
