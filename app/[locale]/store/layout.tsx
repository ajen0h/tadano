import {Button} from '@/components/ui/button';
import {MenuCategories} from './_components/menu-categories';
import Link from 'next/link';
import {HeaderStore} from './_components/header';
import { Input } from '@/components/ui/input';
import { PiMagnifyingGlass } from 'react-icons/pi';

const StoreLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="h-full ">
      {/* <HeaderStore/> */}

      <section>
        <div className="h-[70vh] bg-bannerStore bg-center bg-cover bg-no-repeat ">
          <div className="h-full flex flex-col justify-center items-start px-9 text-white">
            <p className="text-sm font-bold lg:text-[0.95rem]">New Arrivals</p>
            <h2 className="text-6xl lg:text-8xl font-extrabold mb-4">
              ZIP HOODIE
            </h2>
            <p className="text-[0.75rem] w-[50%] lg:w-[20%] lg:text-[0.95rem]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              debitis vel consectetur voluptatem. Asperiores fugiat
              reprehenderit eos
            </p>
            <div className="mt-8">
              <Button>
                <Link href={'#discover'}>Discover New</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
        <MenuCategories />
        {children}
    </div>
  );
};

export default StoreLayout;
