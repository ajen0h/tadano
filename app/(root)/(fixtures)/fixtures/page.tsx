import {getMatch} from '@/actions/match';
import Header from '../_components/header';
import MatchCard from '../_components/match-card';
import { Suspense } from 'react';
import LoadingPage from '../loading';

const FixturesPage = async () => {
  const matches = await getMatch();

  return (
    <>
    

{/*       <Header title="FEBRUARY 2024" subtitle="All fixtures subject to change" />
 */}      {matches.map((match) => (
        <MatchCard key={match.id} match={match} />
        ))}
    </>
  );
};

export default FixturesPage;
