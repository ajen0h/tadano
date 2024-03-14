import {getMatch} from '@/actions/match';
import Header from '../_components/header';
import MatchCard from '../_components/match-card';
import {Suspense} from 'react';
import Image from 'next/image';
import {Button} from '@/components/ui/button';
import {SiGooglemaps} from 'react-icons/si';
import {getTranslations} from 'next-intl/server';

const FixturesPage = async () => {
  const t = await getTranslations('Fixtures');
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
      <section className="p-7">
        <p className="text-center font-bold text-lg">
          {t('Schedule and Results')}
        </p>
      </section>
      {matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </main>
  );
};

export default FixturesPage;
