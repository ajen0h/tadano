import {getRandomNews} from '@/actions/news';
import NavigationLink from '@/components/navbar/navigation-link';
import {Button} from '@/components/ui/button';
import {ArrowBigLeft, Blocks, User2Icon} from 'lucide-react';
import Image from 'next/image';
import {FaRegNewspaper} from 'react-icons/fa';

const NewIdLayout = async ({children}: {children: React.ReactNode}) => {
  const ramdomNews = await getRandomNews();
  return (
    <main className="px-4 lg:px-10 py-6">
      <header className="pb-5">
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
      </header>
      <div className="grid xl:grid-cols-[1fr_400px] 2xl:grid-cols-[1fr_500px] gap-6 ">
        <div>{children}</div>

        {/* Aside Noticias */}
        <aside className="border p-6">
          <header className="mb-3">
            <p className="flex flex-row items-center gap-3 ">
              <FaRegNewspaper /> LO ÚLTIMO EN GUÍAS
            </p>
          </header>

          {/* Posts lateral */}

          {ramdomNews?.map((randomNew) => (
            <>

              <NavigationLink key={randomNew.id} href={`/news/${randomNew.id}`}>
                <article className=" border-b py-6 px-4 hover:cursor-pointer hover:shadow-lg grid grid-cols-2 gap-3">
                  <div className="h-[100px] relative">
                    <Image
                      src={`${randomNew.imageUrl}`}
                      alt={`${randomNew.title}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-5">
                    <p className="text-[1rem] font-bold">
                      {randomNew.description}
                    </p>
                  </div>
                </article>
              </NavigationLink>
            </>
          ))}
        </aside>
      </div>
    </main>
  );
};

export default NewIdLayout;
