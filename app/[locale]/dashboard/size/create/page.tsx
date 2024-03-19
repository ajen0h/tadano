import {getTranslations} from 'next-intl/server';
import {GoBackButton} from '../../_components/goback-button';
import {SizeForm} from '../[sizeId]/_components/size-form';

const CreateSizePage = async ({params: {lang}}: {params: {lang: string}}) => {
  const t = await getTranslations('Dashboard.Size');

  return (
    <div>
      <main className="px-10 py-6">
        <div className="pb-5">
          <GoBackButton href={'/dashboard/size'} title={t('Go back')} />
        </div>
        <SizeForm initialData={null} />
      </main>
    </div>
  );
};

export default CreateSizePage;
