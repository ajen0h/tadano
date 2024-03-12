import {getTeam} from '@/actions/teams';
import {PlayerForm} from './_components/player-form';
import {getPlayer, getPlayerById} from '@/actions/player';
import { GoBackButton } from '../../_components/goback-button';

const PlayerIdPage = async ({params}: {params: {playerId: string,lang:string}}) => {
  const dictionary=await import( `@/app/dictionaries/${params.lang}.json`).then(m=>m.default)
  const player = await getPlayerById(params.playerId);
  const teams = await getTeam();

  return (
    <div>
      <GoBackButton href={"/dashboard/player"} title={dictionary.General["Go back"]}/>
      <PlayerForm initialData={player} teams={teams} />
    </div>
  );
};

export default PlayerIdPage;
