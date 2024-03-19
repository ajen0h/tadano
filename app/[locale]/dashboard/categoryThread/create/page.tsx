import {CategoryThreadForm} from '../[categoryId]/_components/category-form';
import {GoBackButton} from '../../_components/goback-button';
import {getTranslations} from 'next-intl/server';

const CreateCategoryPage = async ({
  params: {lang},
}: {
  params: {lang: string};
}) => {
  const t = await getTranslations('Dashboard');

  return (
    <>
      <main className="px-10 py-6">
        <div className="pb-5">
          <GoBackButton
            href="/dashboard/categoryThread/"
            title={t('Category.Go back')}
          />
        </div>
        <CategoryThreadForm initialData={null} />
      </main>
    </>
  );
};

export default CreateCategoryPage;
