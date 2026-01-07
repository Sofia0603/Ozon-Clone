import { X } from 'lucide-react'
import { PropsWithChildren, RefObject } from 'react'

interface Props extends PropsWithChildren {
  onClose?: () => void;
	ref: RefObject<HTMLDivElement | null>
}

export function Modal({ onClose, children, ref }: Props) {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black/15 absolute top-0 left-0 z-10 fadeIn">
      <div className="bg-white p-5 rounded-3xl shadow-md w-sm relative"
			ref={ref}>

				<button onClick={onClose} className='size-7 bg-zinc-200  hover:rotate-45 transition-all rounded-full flex justify-center items-center mb-4 absolute top-3 right-4'>
					<X className='text-zinc-700 opacity-70' size={20}/>
				</button>

				{children}
			</div>
    </div>
  );
}
