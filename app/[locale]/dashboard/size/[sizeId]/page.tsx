import {getSizeById} from '@/actions/size';
import {SizeForm} from './_components/size-form';
import {GoBackButton} from '../../_components/goback-button';
import {getTranslations} from 'next-intl/server';

const SizeIdPage = async ({
  params,
}: {
  params: {sizeId: string; lang: string};
}) => {
  const t = await getTranslations('Dashboard.Size');

  const size = await getSizeById(params.sizeId);
  return (
    <div>
      <main className="px-10 py-6">
        <div className="pb-5">
          <GoBackButton href={'/dashboard/size'} title={t('Go back')} />
        </div>

        <SizeForm initialData={size} />
      </main>
    </div>
  );
};

export default SizeIdPage;
