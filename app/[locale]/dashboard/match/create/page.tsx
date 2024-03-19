import {getTeam} from '@/actions/teams';
import {MatchForm} from '../_components/match-form';
import { GoBackButton } from '../../_components/goback-button';
import { getTranslations } from 'next-intl/server';

const CreateMatchPage = async({params:{lang}}:{params:{lang:string}}) => {
  const t = await getTranslations('Dashboard.Match');

  const teams = await getTeam();
  return (
    <main className='px-10 py-6'>
      <div className='pb-5'>

      <GoBackButton href={"/dashboard/match"} title={t("Go Back")} />
      </div>
      <MatchForm initialData={null} teams={teams} />
    </main>
  );
};

export default CreateMatchPage;
