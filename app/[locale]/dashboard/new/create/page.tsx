import {getTranslations} from 'next-intl/server';
import {GoBackButton} from '../../_components/goback-button';
import {NewForm} from '../[newId]/_components/new-form';

const CreateNewPage = async ({params: {lang}}: {params: {lang: string}}) => {
  const t = await getTranslations('Dashboard.New');

  return (
    <>
      <main className="px-10 py-6">
        <div className="pb-5">
          <GoBackButton href={'/dashboard/new'} title={t('Go back')} />
        </div>

        <NewForm initialData={null} />
      </main>
    </>
  );
};

export default CreateNewPage;
