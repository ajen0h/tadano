import {getMatch, getMatchNotFinished} from '@/actions/match';
import Header from '../_components/header';
import MatchCard from '../_components/match-card';
import {Suspense} from 'react';
import Image from 'next/image';
import {Button} from '@/components/ui/button';
import {SiGooglemaps} from 'react-icons/si';
import {getTranslations} from 'next-intl/server';
import NavigationLink from '@/components/navbar/navigation-link';
import { MatchCardFixtures } from './_components/match-card-fixtures';
import { Calendar, MapPin } from 'lucide-react';

const FixturesPage = async () => {
  const t = await getTranslations('Fixtures');
  const matches = await getMatchNotFinished();

  return (
    <main>
      <section className="px-10 xl:container">
        <header className="  py-6 border-b-pink-400 border-b">
          <p className="text-3xl font-bold pb-2 lg:text-5xl">Calendario</p>
          <p>Descubre los proximos enfrentamientos</p>
        
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
            <div className="flex flex-row justify-center items-center gap-4 px-5">
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
              <div className="flex flex-row justify-center items-center">
                <p className="text-lg lg:text-xl">UD LAS PALMAS</p>
                
              </div>
              <div className="flex flex-row justify-center items-center">
                <p className="text-lg lg:text-xl">Equipo visitante</p>
                
              </div>
            </div>
            <div className="px-5 pt-3">
              <p className="flex flex-row items-center justify-center gap-2  opacity-70 text-sm lg:text-lg">
                <Calendar className="opacity-70" />
                13 marzo 2024
              </p>
            </div>
            <div className="px-5 pt-3">
              <p className="flex flex-row items-center justify-center gap-2  opacity-70 text-sm lg:text-lg">
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

export default FixturesPage;
