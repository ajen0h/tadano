import {getTeam} from '@/actions/teams';
import {MatchForm} from '../_components/match-form';
import { GoBackButton } from '../../_components/goback-button';
import { getTranslations } from 'next-intl/server';

const CreateMatchPage = async({params:{lang}}:{params:{lang:string}}) => {
  const t = await getTranslations('Dashboard.Match');

  const teams = await getTeam();
  return (
    <>
      <GoBackButton href={"/dashboard/match"} title={t("Go Back")}/>
      <MatchForm initialData={null} teams={teams} />
    </>
  );
};

export default CreateMatchPage;
