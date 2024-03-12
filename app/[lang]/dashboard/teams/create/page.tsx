import {GoBackButton} from '../../_components/goback-button';
import { TeamForm } from '../[teamId]/_components/team-form';

const CreatePlayerPage = async({params:{lang}}:{params:{lang:string}}) => {
  const dictionary=await import( `@/app/dictionaries/${lang}.json`).then(m=>m.default)
  return (
    <div>
      <GoBackButton href={'/dashboard/teams'} title={dictionary.General["Go back"]} />
      <TeamForm initialData={null} />
    </div>
  );
};

export default CreatePlayerPage;
