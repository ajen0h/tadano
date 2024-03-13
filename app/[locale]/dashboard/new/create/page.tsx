import { getTranslations } from 'next-intl/server';
import {GoBackButton} from '../../_components/goback-button';
import {NewForm} from '../[newId]/_components/new-form';

const CreateNewPage = async({params:{lang}}:{params:{lang:string}}) => {
  const t = await getTranslations('Dashboard.New');

  return (
    <>
      <GoBackButton href={'/dashboard/new'} title={t("Go back")} />

      <NewForm initialData={null} />
    </>
  );
};

export default CreateNewPage;
