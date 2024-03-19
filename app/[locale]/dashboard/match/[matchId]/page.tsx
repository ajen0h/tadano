import {getTeam} from '@/actions/teams';
import {MatchForm} from '../_components/match-form';
import {getMatchById} from '@/actions/match';
import {GoBackButton} from '../../_components/goback-button';
import {getTranslations} from 'next-intl/server';

const MatchIdPage = async ({
  params,
}: {
  params: {matchId: string; lang: string};
}) => {
  const t = await getTranslations('Dashboard.Match');

  const match = await getMatchById(params.matchId);
  const teams = await getTeam();
  return (
    <>
      <main className="px-10 py-6">
        <div className="pb-5">
          <GoBackButton
            href="/dashboard/match"
            title={t('Go Back')}></GoBackButton>
          <MatchForm initialData={match} teams={teams} />
        </div>
      </main>
    </>
  );
};

export default MatchIdPage;
