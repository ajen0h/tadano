import {getTeam} from '@/actions/teams';
import {PlayerForm} from './_components/player-form';
import {getPlayer, getPlayerById} from '@/actions/player';
import {GoBackButton} from '../../_components/goback-button';
import {getTranslations} from 'next-intl/server';

const PlayerIdPage = async ({
  params,
}: {
  params: {playerId: string; lang: string};
}) => {
  const t = await getTranslations('Dashboard.Player');

  const player = await getPlayerById(params.playerId);
  const teams = await getTeam();

  return (
    <div>
      <main className="px-10 py-6">
        <div className="pb-5">
          <GoBackButton href={'/dashboard/player'} title={t('Go back')} />
        </div>
        <PlayerForm initialData={player} teams={teams} />
      </main>
    </div>
  );
};

export default PlayerIdPage;
