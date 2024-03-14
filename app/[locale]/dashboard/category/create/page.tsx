import {CategoryForm} from '../[categoryId]/_components/category-form';
import { GoBackButton } from '../../_components/goback-button';
import { getTranslations } from 'next-intl/server';

const CreateCategoryPage = async({params:{lang}}:{params:{lang:string}}) => {
  const t = await getTranslations('Dashboard');
 
  return (
    <>
    <GoBackButton href='/dashboard/category' title={t('Category.Go back')}/>
      <CategoryForm initialData={null} />
    </>
  );
};

export default CreateCategoryPage;
