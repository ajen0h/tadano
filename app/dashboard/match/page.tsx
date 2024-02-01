import {getTeam} from '@/actions/teams';
import {MatchForm} from './_components/match-form';

const MatchPage = async () => {
  const teams = await getTeam();
  return (
    <>
      <MatchForm initialData={null} teams={teams} />
    </>
  );
};

export default MatchPage;
