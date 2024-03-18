import {auth} from '@/auth';
import {FaArrowRight} from 'react-icons/fa';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import NavigationLink from '@/components/navbar/navigation-link';
import {getTranslations} from 'next-intl/server';
import { getNews, getNewsLimit10 } from '@/actions/news';
import { NewsHome } from './_components/news-home';
export default async function Home() {
  const t = await getTranslations('Home');
  const reportData=await getNewsLimit10()
  const session = await auth();

 
  return (
    <main className="">
      <section className="h-[100vh] bg-hero bg-cover bg-center bg-no-repeat p-0 ">
        <div>
          <div>
            <h1 className="text-7xl font-bold mb-3 uppercase lg:text-9xl">
              Atlético barril
            </h1>
            <p className="text-lg lg:xl: text-white/60">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit ea
              harum saepe fuga eligendi culpa alias, quibusdam ad, possimus
              similique quis expedita rem quo ut. Dolor qui voluptatem
              recusandae accusantium!
            </p>
          </div>

          <div className="w-[50%] grid">
            <Button variant={'border'} size={'lg'} className="">
              <Link
                href={'/'}
                className="flex flex-row justify-center items-center gap-2">
                <FaArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      {/* Matches */}
      <section className=" py-5 px-10  bg-black text-white">
        {/* Proximo partido */}
        <div className="xl:container pb-4">
          <Button className="bg-white text-black rounded-none italic hover:bg-pink-400 hover:text-white font-bold">
            <NavigationLink href={'/fixtures'}>{t('View More')}</NavigationLink>
          </Button>
        </div>
        <main className="xl:container grid grid-cols-1 md:grid-cols-2">
          <section className=" border border-white">
            <div className="border-b border-white p-4">
              <p className="text-lg font-bold">SUN 17 MAR</p>
            </div>
            <div>
              <div className="p-4">
                <p>League</p>
              </div>
              <div className="px-4">
                <p>18:00</p>
                <p>GEWISS STADIUM | BERGAMO</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex flex-row justify-start items-center gap-2 border-b border-white pb-4">
                <div className="relative h-[40px] lg:h-[80px] w-[40px] lg:w-[80px] border-b-white">
                  <Image
                    src={'/tanjiro.jpg'}
                    alt="tanjiro"
                    fill
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <p>Atalanta</p>
              </div>
              <div className="flex flex-row justify-start items-center gap-2 pt-4 pb-6">
                <div className="relative lg:h-[80px] w-[40px] lg:w-[80px]">
                  <Image
                    src={'/tanjiro.jpg'}
                    alt="tanjiro"
                    fill
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <p>Fiorentina</p>
              </div>
              <div>
                <Button className="rounded-none bg-pink-400 hover:bg-pink-200 px-10">
                  {t('Get Ticket')}
                </Button>
              </div>
            </div>
          </section>
        </main>
      </section>
      {/* News */}
      <section className="">
        <header className="bg-slate-100">
          <p className="xl:container py-4 text-xl font-semibold px-10">
            {t('News Title')}
          </p>
          </header>
        <main className="xl:container px-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {reportData.map((report,index)=>(
            <NewsHome key={report.id} reportData={report} index={index}/>
          ))}
          </main>
        <div className="w-full p-10 text-center">
          <Button className="text-md rounded-none text-black bg-white border-2 border-black font-normal px-12 hover:bg-black hover:text-white ease-in duration-200 ">
            <NavigationLink href={'/news'}>{t('See More')}</NavigationLink>
          </Button>
        </div>
      </section>
      <section className="xl:container">
        <div className="flex justify-start items-center">
          <p className="bg-black text-white px-10 py-6 font-semibold text-lg">
            {t('Our Team')}
          </p>
        </div>
        {/* <div className="flex flex-col justify-center items-center bg-slate-50">
          <div className="relative h-[380px] w-full ">
            <Image
              src={'/elyoya.jpg'}
              alt="elyoya"
              fill
              className="object-cover"
            />
          </div>
        </div> */}
      </section>
    </main>
  );
}
