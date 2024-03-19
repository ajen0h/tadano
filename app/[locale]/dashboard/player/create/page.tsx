import {getTeam} from '@/actions/teams';
import {GoBackButton} from '../../_components/goback-button';
import {PlayerForm} from '../[playerId]/_components/player-form';
import { getTranslations } from 'next-intl/server';

const CreatePlayerPage = async({params:{lang}}:{params:{lang:string}}) => {
  const t = await getTranslations('Dashboard.Player');
  const teams = await getTeam();

  return (
    <> <main className='px-10 py-6'>

    <div className='pb-5'>

      <GoBackButton href={'/dashboard/player'} title={t("Go back")} />
    </div>
      <PlayerForm initialData={null} teams={teams}/>
    </main>
    </>
  );
};

export default CreatePlayerPage;
