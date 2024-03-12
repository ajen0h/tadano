import {getTeam} from '@/actions/teams';
import {MatchForm} from '../_components/match-form';
import { GoBackButton } from '../../_components/goback-button';

const CreateMatchPage = async({params:{lang}}:{params:{lang:string}}) => {
  const dictionary=await import( `@/app/dictionaries/${lang}.json`).then(m=>m.default)
  const teams = await getTeam();
  return (
    <>
      <GoBackButton href={"/dashboard/match"} title={dictionary.General["Go back"]}/>
      <MatchForm initialData={null} teams={teams} />
    </>
  );
};

export default CreateMatchPage;
