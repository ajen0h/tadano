import {getNewById} from '@/actions/news';
import {NewForm} from './_components/new-form';
import { GoBackButton } from '../../_components/goback-button';
import { getTranslations } from 'next-intl/server';

const NewIdPage = async ({params}: {params: {newId: string,lang:string}}) => {
  const t = await getTranslations('Dashboard.New');

  const newById = await getNewById(params.newId);
  return (
    <div>
      <GoBackButton href={"/dashboard/new"} title={t("Go back")}/>
      <NewForm initialData={newById} />
    </div>
  );
};

export default NewIdPage;
