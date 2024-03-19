import {getRandomNews} from '@/actions/news';
import NavigationLink from '@/components/navbar/navigation-link';
import {Button} from '@/components/ui/button';
import {ArrowBigLeft, Blocks, ChevronLeft, User2Icon} from 'lucide-react';
import Image from 'next/image';
import {FaRegNewspaper} from 'react-icons/fa';
import { RamdomNews } from './_components/randoms-news';

const NewIdLayout = async ({children}: {children: React.ReactNode}) => {
  const ramdomNews = await getRandomNews();

  return (
    <main className="">
      {/*   <header className="pb-5">
        <div className="flex justify-between items-center">
          <div>
            <Button asChild>
              <NavigationLink href={'/news'} className="flex flex-row gap-2 ">
                <ArrowBigLeft />
                <p>Return</p>
              </NavigationLink>
            </Button>
          </div>
          <p className="uppercase font-bold lg:text-lg">Magazine</p>
        </div>
      </header> */}
      <header>
        <div className="px-5 flex justify-between items-center bg-black h-[50px]">
          <div className="text-white">
            <NavigationLink href={'/news'} className="flex flex-row gap-2 ">
              <ChevronLeft />
              <p>Back To News</p>
            </NavigationLink>
          </div>
        </div>
      </header>
      <div className="grid xl:grid-cols-1 gap-6 ">
        <div>{children}</div>

        
      </div>
    </main>
  );
};

export default NewIdLayout;
