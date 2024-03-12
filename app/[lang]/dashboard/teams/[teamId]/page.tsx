import {getTeam, getTeamById} from '@/actions/teams';
import {TeamForm} from './_components/team-form';
import { GoBackButton } from '../../_components/goback-button';

const TeamPageId = async ({params}: {params: {teamId: string,lang:string}}) => {
  const dictionary=await import( `@/app/dictionaries/${params.lang}.json`).then(m=>m.default)
  const team = await getTeamById(params.teamId);

  return (
    <div>
      <GoBackButton href={"/dashboard/size"} title={dictionary.General["Go back"]}/>
      <TeamForm initialData={team} />
    </div>
  );
};

export default TeamPageId;
