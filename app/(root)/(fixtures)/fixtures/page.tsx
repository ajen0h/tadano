import {getMatch} from '@/actions/match';
import Header from '../_components/header';
import MatchCard from '../_components/match-card';
import {Suspense} from 'react';
import Image from 'next/image';
import {Button} from '@/components/ui/button';
import { SiGooglemaps } from "react-icons/si";

const FixturesPage = async () => {
  const matches = await getMatch();

  return (
    <main>
      {/* Banner */}
      <section>
        <div className="h-[400px] relative">
          <Image
            src={'/bannerEquipo.jpg'}
            alt=""
            fill
            className="object-cover object-top"
          />
        </div>
      </section>
      {/* Mini banner */}
      <section className='p-7'>
        <p className='text-center font-bold text-lg'>Calendario y Resultados</p>
      </section>

      <section className="px-4 lg:px-10 py-6 bg-gray-200">
        <p className="uppercase font-semibold mb-3 lg:text-xl">Julio 23</p>
        {/* Card partido */}
        <main className='grid xl:grid-cols-2 gap-3'>

        <article className="border bg-gray-300 p-4">
          <header className="flex flex-col justify-center items-center gap-2 mb-2">
            <p className="text-sm font-bold lg:text-[1rem]">Martes 5 Marzo 2024</p>
            <p className="text-sm opacity-50 font-bold lg:text-[1rem]">Amistoso</p>
          </header>
          <main className="grid grid-cols-[1fr_auto_1fr] gap-5 mb-2">
            {/* Equipo 1 */}
            <div className='flex flex-row items-center justify-end gap-3'>
            <p className='font-bold lg:text-lg'>MadLions</p>
              <Image
                src={'/madlions.png'}
                width={50}
                height={50}
                className="rounded-full"
                alt=""
                />
            </div>

            <div className='flex flex-row items-center gap-2'>
              <Button disabled={true} className='disabled:opacity-100'>3</Button>
              <Button disabled={true}>0</Button>
            </div>
            {/* Equipo 2 */}

            <div className='flex flex-row items-center gap-3'>
              <Image
                src={'/kc.svg'}
                width={50}
                height={50}
                className="rounded-full"
                alt=""
              />
              <p className='font-bold lg:text-lg'>Kcorp</p>
            </div>
          </main>
          <div className='hidden md:flex flex-row justify-center items-center opacity-50 font-bold gap-1'>
          <SiGooglemaps />
          <p>El carmen</p>
          </div>
          <div className=' mt-4'>
            <Button className='w-full' >Obtener Ticket</Button>
          </div>
        </article>
      </main>
      </section>

      {/* {matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))} */}
    </main>
  );
};

export default FixturesPage;
