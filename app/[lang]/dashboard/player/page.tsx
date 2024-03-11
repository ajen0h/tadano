import {getTeam} from '@/actions/teams';
import {PlayerForm} from './[playerId]/_components/player-form';

const PlayerPage = async () => {
  const teams = await getTeam();
  return (
    <div>
      PlayerPage!
      <PlayerForm initialData={null} teams={teams} />
    </div>
  );
};

export default PlayerPage;
