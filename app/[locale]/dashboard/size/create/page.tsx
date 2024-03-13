import { getTranslations } from 'next-intl/server';
import {GoBackButton} from '../../_components/goback-button';
import {SizeForm} from '../[sizeId]/_components/size-form';

const CreateSizePage = async({params:{lang}}:{params:{lang:string}}) => {
  const t = await getTranslations('Dashboard.Size');

  return (
    <div>
      <GoBackButton href={'/dashboard/size'} title={t("Go back")} />
      <SizeForm initialData={null} />
    </div>
  );
};

export default CreateSizePage;
