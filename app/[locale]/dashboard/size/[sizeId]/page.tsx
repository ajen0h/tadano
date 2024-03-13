import {getSizeById} from '@/actions/size';
import {SizeForm} from './_components/size-form';
import { GoBackButton } from '../../_components/goback-button';
import { getTranslations } from 'next-intl/server';

const SizeIdPage = async ({params}: {params: {sizeId: string,lang:string}}) => {
  const t = await getTranslations('Dashboard.Size');

  const size = await getSizeById(params.sizeId);
  return (
    <div>
      <GoBackButton href={'/dashboard/size'} title={t("Go back")} />

      <SizeForm initialData={size} />
    </div>
  );
};

export default SizeIdPage;
