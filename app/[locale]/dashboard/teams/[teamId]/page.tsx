import {getTeam, getTeamById} from '@/actions/teams';
import {TeamForm} from './_components/team-form';
import { GoBackButton } from '../../_components/goback-button';
import { getTranslations } from 'next-intl/server';

const TeamPageId = async ({params}: {params: {teamId: string,lang:string}}) => {
  const t = await getTranslations('Dashboard.Team');

  const team = await getTeamById(params.teamId);

  return (
    <div>
      <GoBackButton href={"/dashboard/team"} title={t("Go back")}/>
      <TeamForm initialData={team} />
    </div>
  );
};

export default TeamPageId;
