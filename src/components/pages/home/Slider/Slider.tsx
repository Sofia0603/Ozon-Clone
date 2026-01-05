'use client'

import {useState} from "react";
import {SLIDES} from "@/components/pages/home/Slider/slider.data";
import Image from "next/image";
import {ChevronLeft, ChevronRight} from "lucide-react";
import cn from 'clsx'


export function Slider() {
    const [activeSlideId, setActiveSlideId] = useState(1);


    return(
        <div className="relative rounded-3xl mt-3">
        {SLIDES.map((slide, index) => (
            <div
                key={index}
                className={cn(slide.id === activeSlideId ? 'block' : 'hidden',
                'rounded-3xl overflow-hidden',
                )}
            >
                <Image
                    src={slide.image}
                    alt=""
                    className="w-full "
                    width={1450}
                    height={307}
                />
            </div>
        ))}

        <div className='absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4'>
         <button
             onClick={() => {
                 setActiveSlideId(activeSlideId === 1 ? SLIDES.length : activeSlideId - 1);
             }}
             className="bg-white/50 transition hover:bg-white/75 text-black font-bold p-1.5 rounded-lg"
         >
           <ChevronLeft size={20} />
         </button>
        <button
            onClick={() => {
                setActiveSlideId(activeSlideId === 1 ? SLIDES.length : activeSlideId - 1);
            }}
            className="bg-white/50 transition hover:bg-white/75 text-black font-bold p-1.5 rounded-lg"
        >
            <ChevronRight size={20} />
        </button>
        </div>



    </div>
    )
}