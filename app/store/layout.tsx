import {Button} from '@/components/ui/button';
import {MenuCategories} from './_components/menu-categories';
import Link from 'next/link';
import { HeaderStore } from './_components/header';

const StoreLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="h-full ">
      <HeaderStore/>
      
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
      <main className="px-7">
        <section  id="discover">
          <div className="flex flex-col justify-center items-center py-9 gap-2">
            <h2 className="text-3xl font-bold">New Arrivals</h2>
            <p className="text-center w-[50%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              debitis vel consectetur voluptatem.
            </p>
          </div>
        </section>
        <MenuCategories />
        {children}
      </main>
    </div>
  );
};

export default StoreLayout;
