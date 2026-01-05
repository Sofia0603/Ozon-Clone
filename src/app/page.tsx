import Image from "next/image";
import {Header} from "@/components/layout/header/Header";
import {TopMenu} from "@/components/layout/top-menu/TopMenu";
import {Slider} from "@/components/pages/home/Slider/Slider";

export default function Home() {
  return (
    <div className='container mx-auto'>
       <div className="bg-white rounded-b-3xl">
           <Header/>
           <TopMenu />
           <Image
               src='/banner.png'
               alt='Banner'
               width={1407}
               height={94}
               className="mx-auto mt-5"
               draggable={false}

           />
       </div>

        <Slider />
    </div>
  );
}
