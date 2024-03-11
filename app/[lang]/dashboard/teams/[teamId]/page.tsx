import {getTeam, getTeamById} from '@/actions/teams';
import {TeamForm} from './_components/team-form';

const TeamPageId = async ({params}: {params: {teamId: string}}) => {
  const team = await getTeamById(params.teamId);

  return (
    <div>
      TeamPageId
      <TeamForm initialData={team} />
    </div>
  );
};

export default TeamPageId;
