import {getTranslations} from 'next-intl/server';
import {GoBackButton} from '../../_components/goback-button';
import {ColorForm} from '../_components/color-form';

const ColorCreatePage = async ({params: {lang}}: {params: {lang: string}}) => {
  const t = await getTranslations('Dashboard.Color');

  return (
    <>
      <main className="px-10 py-6">
        <div className="pb-5">
          <GoBackButton href={'/dashboard/color'} title={t('Go Back')} />
        </div>

        <ColorForm initialData={null} />
      </main>
    </>
  );
};

export default ColorCreatePage;
