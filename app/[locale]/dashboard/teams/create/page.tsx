import { getTranslations } from 'next-intl/server';
import {GoBackButton} from '../../_components/goback-button';
import { TeamForm } from '../[teamId]/_components/team-form';

const CreateTeamPage = async({params:{lang}}:{params:{lang:string}}) => {
  const t = await getTranslations('Dashboard.Team');

  return (
    <div>
      <GoBackButton href={'/dashboard/teams'} title={t("Go back")} />
      <TeamForm initialData={null} />
    </div>
  );
};

export default CreateTeamPage;
