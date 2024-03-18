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

const FixturesPage = async () => {
  const t = await getTranslations('Fixtures');
  const matches = await getMatchNotFinished();

  return (
    <main>
      <section className="bg-yellow-900 px-10">
        <header className=" text-white py-6 border-b-white border-b">
          <p className="text-3xl font-bold pb-2 lg:text-4xl">Our Fixtures</p>
          <p className="text-xs font-semibold">
            All times displayed in your local timezone
          </p>
        </header>
        {matches.map((match) => (
          <MatchCardFixtures key={match.id} match={match} />
        ))}
      </section>
    </main>
  );
};

export default FixturesPage;
