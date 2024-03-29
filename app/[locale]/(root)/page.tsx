import {auth} from '@/auth';
import {FaArrowRight} from 'react-icons/fa';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import NavigationLink from '@/components/navbar/navigation-link';
import {getTranslations} from 'next-intl/server';
import {getNews, getNewsLimit6, getRandomNewsLimit1} from '@/actions/news';
import {NewsHome} from './_components/news-home';
import {Calendar, MapPin} from 'lucide-react';
import {FechaThread} from '../forum/_components/fecha-thread';
import {
  getMatchFinishedLimit2,
  getMatchNotFinishedLimit2,
} from '@/actions/match';
export default async function Home() {
  const t = await getTranslations('General');
  const reportData = await getNewsLimit6();
  const matchfinish = await getMatchFinishedLimit2();
  const matchnotfinish = await getMatchNotFinishedLimit2();
  const session = await auth();

  return (
    <main className="">
      <section className="h-[80vh] bg-hero bg-cover bg-center bg-no-repeat p-0 shadow-xl ">
        {/* <div>
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
        </div> */}
      </section>

      {/* News */}
      <section className=" py-5 px-10">
        <p className="font-bold py-4 text-xl">{t("LAST NEWS")}</p>
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reportData.map((report) => (
            <NavigationLink key={report.id} href={`/news/${report.id}`}>

            <article key={report.id}>
              <div className="relative h-[400px] overflow-hidden rounded-t-xl">
                <Image
                  src={`${report.imageUrl}`}
                  alt="elyoya"
                  fill
                  className="object-cover  overflow-hidden hover:scale-105 cursor-pointer ease-in duration-500"
                />
              </div>
              <div className="flex flex-col p-5 border rounded-b-xl gap-4">
                <div className="flex flex-col gap-3">
                  <p className="font-semibold lg:text-lg">{report.title}</p>
                  <p className="text-sm lg:text-[1rem]">{report.description}</p>
                </div>
                <div>
                  <p className="text-xs lg:text-sm opacity-80">
                    <FechaThread createdAt={report.createdAt} />
                  </p>
                </div>
              </div>
            </article>
                  </NavigationLink>
          ))}
        </main>
        <div className="flex justify-center items-center py-4">
          <Button className="flex justify-center items-center ">
            <NavigationLink href={'/news'}>{t('See More')}</NavigationLink>
          </Button>
        </div>
      </section>

      {/* Cta Store */}
      <section>
        <main>
          <div
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/ctastore.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'top',
              height: '30vh',
            }}>
            <div className="px-10 xl:container h-full text-white flex flex-col justify-center items-center gap-4">
              <p className="text-4xl font-bold md:text-6xl text-center">
                {t("Discover our store")}
              </p>
              <Button className="bg-white text-black hover:bg-black hover:text-white transition-all text-start">
                 {t("Go To Store")}
              </Button>
            </div>
          </div>
        </main>
      </section>
      {/* matches */}
      <section className=" py-5 px-10">
        <p className="font-bold py-4 text-xl">{t("MATCHES")}</p>
        <main className=" grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {matchfinish.map((matchfi) => (
            <article
              key={matchfi.id}
              className="bg-gray-100 rounded-xl px-4 py-6">
              <div>
                <p className="text-end font-bold">{matchfi.league}</p>
              </div>
              <div className="flex flex-row justify-start items-center gap-3 px-5">
                <div className="relative h-[60px] w-[60px]">
                  <Image
                    src={`${matchfi.localTeam.imageUrl}`}
                    alt="elyoya"
                    fill
                    className="object-cover  rounded-full "
                  />
                </div>
                <p className="font-bold">VS</p>
                <div className="relative h-[60px] w-[60px]">
                  <Image
                    src={`${matchfi.visitingTeam.imageUrl}`}
                    alt="elyoya"
                    fill
                    className="object-cover  rounded-full "
                  />
                </div>
              </div>
              <div className="px-5 pt-4">
                <div className="flex flex-row justify-between items-center">
                  <p className="text-lg">{matchfi.localTeam.name}</p>
                  <p className="text-lg">{matchfi.localGoals}</p>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <p className="text-lg">{matchfi.visitingTeam.name}</p>
                  <p className="text-lg">{matchfi.visitingGoals}</p>
                </div>
              </div>
              <div className="px-5 pt-3">
                <p className="flex flex-row items-center justify-start gap-2  opacity-70 text-sm">
                  <Calendar className="opacity-70" />
                  <FechaThread createdAt={matchfi.createdAt} />
                </p>
              </div>
              <div className="px-5 pt-3">
                <p className="flex flex-row items-center justify-start gap-2  opacity-70 text-sm">
                  <MapPin className="opacity-70" />
                  {matchfi.stadium}
                </p>
              </div>
            </article>
          ))}
          {matchnotfinish.map((matchnotfi) => (
            <article
              key={matchnotfi.id}
              className="bg-gray-100 rounded-xl px-4 py-6">
              <div>
                <p className="text-end font-bold lg:text-lg lg:pb-4">
                  {matchnotfi.league}
                </p>
              </div>
              <div className="flex flex-row justify-center items-center gap-4 px-5">
                <div className="relative h-[60px] w-[60px] lg:h-[90px] lg:w-[90px]">
                  <Image
                    src={`${matchnotfi.localTeam.imageUrl}`}
                    alt="elyoya"
                    fill
                    className="object-cover  rounded-full "
                  />
                </div>
                <p className="font-bold">VS</p>
                <div className="relative h-[60px] w-[60px] lg:h-[90px] lg:w-[90px]">
                  <Image
                    src={`${matchnotfi.localTeam.imageUrl}`}
                    alt="elyoya"
                    fill
                    className="object-cover  rounded-full "
                  />
                </div>
              </div>
              <div className="px-5 pt-4">
                <div className="flex flex-row justify-center items-center">
                  <p className="text-lg lg:text-xl">
                    {matchnotfi.localTeam.name}
                  </p>
                </div>
                <div className="flex flex-row justify-center items-center">
                  <p className="text-lg lg:text-xl">
                    {matchnotfi.visitingTeam.name}
                  </p>
                </div>
              </div>
              <div className="px-5 pt-3">
                <p className="flex flex-row items-center justify-center gap-2  opacity-70 text-sm lg:text-lg">
                  <Calendar className="opacity-70" />
                  <FechaThread createdAt={matchnotfi.createdAt} />
                </p>
              </div>
              <div className="px-5 pt-3">
                <p className="flex flex-row items-center justify-center gap-2  opacity-70 text-sm lg:text-lg">
                  <MapPin className="opacity-70" />
                  {matchnotfi.stadium}
                </p>
              </div>
              <div></div>
            </article>
          ))}
        </main>
        <div className="flex justify-center items-center py-4">
          <Button className="flex justify-center items-center ">
            <NavigationLink href={'/fixtures'}>{t('See More')}</NavigationLink>
          </Button>
        </div>
      </section>
      <section className="pt-6">
        <div className=" bg-black flex justify-start items-center p-5 w-[50%] md:w-[30%] lg:w-[25%] xl:w-[17%]">
          <p className="text-white text-xl font-bold uppercase hover:text-pink-400">
          {t('Our team')}
          </p>
        </div>
        <NavigationLink href="/team">
          <main className="overflow-hidden">
            <div
              className=" p-8   hover:scale-105 cursor-pointer ease-in duration-500"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9)), url('/banner-home.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '70vh',
              }}></div>
          </main>
        </NavigationLink>
      </section>
    </main>
  );
}
