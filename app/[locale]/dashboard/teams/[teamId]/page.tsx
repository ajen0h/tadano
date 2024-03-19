import {getTeam, getTeamById} from '@/actions/teams';
import {TeamForm} from './_components/team-form';
import { GoBackButton } from '../../_components/goback-button';
import { getTranslations } from 'next-intl/server';

const TeamPageId = async ({params}: {params: {teamId: string,lang:string}}) => {
  const t = await getTranslations('Dashboard.Team');

  const team = await getTeamById(params.teamId);

  return (
    <div>
      
 <main className='px-10 py-6'>

      <div className='pb-5'>

      <GoBackButton href={"/dashboard/teams"} title={t("Go back")}/>
      </div>
      <TeamForm initialData={team} />
 </main>
    </div>
  );
};

export default TeamPageId;
