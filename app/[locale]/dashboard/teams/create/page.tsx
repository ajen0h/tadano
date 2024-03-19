import { getTranslations } from 'next-intl/server';
import {GoBackButton} from '../../_components/goback-button';
import { TeamForm } from '../[teamId]/_components/team-form';

const CreateTeamPage = async({params:{lang}}:{params:{lang:string}}) => {
  const t = await getTranslations('Dashboard.Team');

  return (
    <div>
      
 <main className='px-10 py-6'>

      <div className='pb-5'>

      <GoBackButton href={'/dashboard/teams'} title={t("Go back")} />
      </div>
      <TeamForm initialData={null} />
 </main>
    </div>
  );
};

export default CreateTeamPage;
