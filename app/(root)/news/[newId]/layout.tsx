import {Button} from '@/components/ui/button';
import {ArrowBigLeft, Blocks, User2Icon} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {FaRegNewspaper} from 'react-icons/fa';

const NewIdLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <main className="px-4 lg:px-10 py-6">
      <header className="pb-5">
        <div className="flex justify-between items-center">
          <div>
            <Button asChild>
              <Link href={'/news'} className="flex flex-row gap-2 ">
                <ArrowBigLeft />
                <p>Return</p>
              </Link>
            </Button>
          </div>
          <p className="uppercase font-bold lg:text-lg">Magazine</p>
        </div>
      </header>
      <div className="grid lg:grid-cols-[1fr_400px] gap-6 ">
        <div>{children}</div>

        {/* Aside Noticias */}
        <aside className="border p-6">
          <header className="mb-3">
            <p className="flex flex-row items-center gap-3 ">
              <FaRegNewspaper /> LO ÚLTIMO EN GUÍAS
            </p>
          </header>

          {/* Posts lateral */}
          <article className=" border-b py-6 px-4 hover:cursor-pointer hover:shadow-lg grid grid-cols-2 gap-3">
            <div className="h-full relative">
              <Image
                src={'/tanjiro.jpg'}
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-5">
              <p className="text-[1rem] font-bold">
                Cómo hacer leash siendo support en League of Legends
              </p>
            </div>
          </article>
          <article className=" border-b py-6 px-4 hover:cursor-pointer hover:shadow-lg grid grid-cols-2 gap-3">
            <div className="h-full relative">
              <Image
                src={'/tanjiro.jpg'}
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-5">
              <p className="text-[1rem] font-bold">
                Cómo hacer leash siendo support en League of Legends
              </p>
            </div>
          </article>
        </aside>
      </div>
    </main>
  );
};

export default NewIdLayout;
