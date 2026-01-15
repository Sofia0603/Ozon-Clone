import { cn } from '@/utils/cn';
import { Minus, Plus } from 'lucide-react';

interface Props {
  updateQuantityInCart: (type: 'increment' | 'decrement') => void;
  isPendingQuantity: boolean;
  quantityInCart: number;
  colors?: [string, string, string];
}

export function ProductQuantity({
  updateQuantityInCart,
  isPendingQuantity,
  quantityInCart,
  colors = ['bg-blue-100/50', 'hover: bg-blue-200/70', 'text-primary'],
}: Props) {
  return (
    <div className="flex items-center gap-0.5">
      <button
        className={cn(
          colors[0],
          colors[1],
          colors[2],
          'px-4 py-3.5 rounded-2xl transition-color'
        )}
        onClick={() => updateQuantityInCart('decrement')}
        disabled={isPendingQuantity}
      >
        <Minus />
      </button>
      <span className="font-medium px-4 py-2">{quantityInCart}</span>
      <button
        className={cn(
          colors[0],
          colors[1],
          colors[2],
          'px-4 py-3.5 rounded-2xl transition-color'
        )}
        onClick={() => updateQuantityInCart('increment')}
        disabled={isPendingQuantity}
      >
        <Plus />
      </button>
    </div>
  );
}
