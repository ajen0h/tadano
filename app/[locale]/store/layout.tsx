import {Button} from '@/components/ui/button';
import {MenuCategories} from './_components/menu-categories';
import Link from 'next/link';
import {HeaderStore} from './_components/header';
import {Input} from '@/components/ui/input';
import {PiMagnifyingGlass} from 'react-icons/pi';
import {getTranslations} from 'next-intl/server';

const StoreLayout = async ({children}: {children: React.ReactNode}) => {
  const t = await getTranslations('General');
  return (
    <div className="h-full ">
      {/* <HeaderStore/> */}

      <section className="px-10 xl:container pt-8">
        <div className="h-[70vh] bg-bannerStore bg-center bg-cover bg-no-repeat rounded-3xl">
          <div className="h-full flex flex-col justify-center items-start px-9 text-white">
            <p className="text-sm font-bold lg:text-[0.95rem]">{t("New Arrivals")}</p>
            <h2 className="text-5xl lg:text-7xl font-extrabold mb-4 uppercase">
              {t("All garments")}
            </h2>
            <p className="text-[0.75rem] w-[50%] lg:w-[20%] lg:text-[0.95rem]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              debitis vel consectetur voluptatem. Asperiores fugiat
              reprehenderit eos
            </p>
            <div className="mt-8">
              <Button>
                <Link href={'#discover'}>{t("Discover New")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/*  <MenuCategories /> */}
      {children}
    </div>
  );
};

export default StoreLayout;
