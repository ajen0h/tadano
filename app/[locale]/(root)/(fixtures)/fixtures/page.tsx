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
import { FechaThread } from '@/app/[locale]/forum/_components/fecha-thread';
import { auth } from '@/auth';
import { Matches } from './_components/matches';

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
        {matches.map((matchnotfi) => (
            <Matches key={matchnotfi.id} matchnotfi={matchnotfi}/>
          ))}
        </main>
        </section>

      </section>
    </main>
  );
};

export default FixturesPage;
