import {getTeam} from '@/actions/teams';
import {GoBackButton} from '../../_components/goback-button';
import {PlayerForm} from '../[playerId]/_components/player-form';

const CreatePlayerPage = async({params:{lang}}:{params:{lang:string}}) => {
  const dictionary=await import( `@/app/dictionaries/${lang}.json`).then(m=>m.default)
  const teams = await getTeam();

  return (
    <>
      <GoBackButton href={'/dashboard/player'} title={dictionary.General["Go back"]} />
      <PlayerForm initialData={null} teams={teams}/>
    </>
  );
};

export default CreatePlayerPage;
