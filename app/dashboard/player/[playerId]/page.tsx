import {getTeam} from '@/actions/teams';
import {PlayerForm} from './_components/player-form';
import {getPlayer, getPlayerById} from '@/actions/player';

const PlayerIdPage = async ({params}: {params: {playerId: string}}) => {
  const player = await getPlayerById(params.playerId);
  const teams = await getTeam();

  return (
    <div>
      PlayerIdPage
      <PlayerForm initialData={player} teams={teams} />
    </div>
  );
};

export default PlayerIdPage;
