import {getTeam} from '@/actions/teams';
import {GoBackButton} from '../../_components/goback-button';
import {PlayerForm} from '../[playerId]/_components/player-form';
import { getTranslations } from 'next-intl/server';

const CreatePlayerPage = async({params:{lang}}:{params:{lang:string}}) => {
  const t = await getTranslations('Dashboard.Player');
  const teams = await getTeam();

  return (
    <>
      <GoBackButton href={'/dashboard/player'} title={t("Go back")} />
      <PlayerForm initialData={null} teams={teams}/>
    </>
  );
};

export default CreatePlayerPage;
