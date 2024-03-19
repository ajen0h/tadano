import {SearcInput} from './_components/search-input';
import {getNews} from '@/actions/news';
import {PostCard} from './_components/post-card';
import {Button} from '@/components/ui/button';
import Image from 'next/image';

const NewsPage = async ({
  searchParams: {query},
}: {
  searchParams: {query: string};
}) => {
  const reports = await getNews(query);

  return (
    <main>
      {/* <Banner2 /> */}
      <section className="px-10 xl:container pt-6">
        <p className="text-3xl font-bold py-4 lg:text-5xl">Noticias</p>

        <section className="h-[100px] bg-slate-100 flex flex-row justify-start items-center p-4">
          <SearcInput />
        </section>
        <section className='pt-6'>
          {/* <main className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {reports &&
              reports.map((data, index) => (
                <PostCard key={data.id} reportData={data} index={index} />
              ))}
          </main> */}
          <main className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            <article>
              <div className="relative h-[400px] overflow-hidden rounded-t-xl">
                <Image
                  src={'/elyoya.jpg'}
                  alt="elyoya"
                  fill
                  className="object-cover  overflow-hidden hover:scale-105 cursor-pointer ease-in duration-500"
                />
              </div>
              <div className="flex flex-col p-5 border rounded-b-xl gap-4">
                <div className="flex flex-col gap-3">
                  <p className="font-semibold lg:text-lg">
                    Fernandes pone la mira en Wembley
                  </p>
                  <p className="text-sm lg:text-[1rem]">
                    Bruno explica por qué sabe todo sobre nuestro rival de
                    semifinales, mientras atesora un puesto en semifinales.
                  </p>
                </div>
                <div>
                  <p className="text-xs lg:text-sm opacity-80">13 marzo 2024</p>
                </div>
              </div>
            </article>
          </main>
        </section>

        <div className="max-w-4xl mx-auto p-4"></div>
      </section>
    </main>
  );
};

export default NewsPage;
