import {getMatchFinished} from '@/actions/match';
import {Button} from '@/components/ui/button';
import { Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';

const ResultPage = async () => {
  const matches = await getMatchFinished();
  return (
    <main>
    <section className="px-10 xl:container">
      <header className="  py-6 border-b-pink-400 border-b">
        <p className="text-3xl font-bold pb-2 lg:text-5xl">Resultados</p>
        <p>Ultimos enfrentamientos de club</p>
      
      </header>
      {/* Respeta lo de los botones */}
      {/* {matches.map((match) => (
        <MatchCardFixtures key={match.id} match={match} />
      ))} */}

      <section className='pt-6'>
      <main className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <article className="bg-gray-100 rounded-xl px-4 py-6">
          <div>
          <p className="text-end font-bold lg:text-lg lg:pb-4">Santander</p>
          </div>
          <div className="flex flex-row justify-start items-center gap-3 px-5">
          <div className="relative h-[60px] w-[60px] lg:h-[90px] lg:w-[90px]">
              <Image
                src={'/elyoya.jpg'}
                alt="elyoya"
                fill
                className="object-cover  rounded-full "
              />
            </div>
            <p className="font-bold">VS</p>
            <div className="relative h-[60px] w-[60px] lg:h-[90px] lg:w-[90px]">
              <Image
                src={'/tanjiro.jpg'}
                alt="elyoya"
                fill
                className="object-cover  rounded-full "
              />
            </div>
          </div>
          <div className="px-5 pt-4">
            <div className="flex flex-row justify-between items-center">
            <p className="text-lg lg:text-xl">UD LAS PALMAS</p>
              <p className="text-lg lg:text-xl">0</p>
            </div>
            <div className="flex flex-row justify-between items-center">
              <p className="text-lg lg:text-xl">Equipo visitante</p>
              <p className="text-lg lg:text-xl">0</p>
            </div>
          </div>
          <div className="px-5 pt-3">
            <p className="flex flex-row items-center justify-start gap-2  opacity-70 text-sm lg:text-lg">
              <Calendar className="opacity-70" />
              13 marzo 2024
            </p>
          </div>
          <div className="px-5 pt-3">
            <p className="flex flex-row items-center justify-start gap-2  opacity-70 text-sm lg:text-lg">
              <MapPin className="opacity-70" />
              El carmen
            </p>
          </div>
          <div></div>
        </article>
      </main>
      </section>

    </section>
  </main>
  );
};

export default ResultPage;
