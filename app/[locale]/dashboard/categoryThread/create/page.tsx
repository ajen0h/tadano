import {CategoryThreadForm} from '../[categoryId]/_components/category-form';
import { GoBackButton } from '../../_components/goback-button';
import { getTranslations } from 'next-intl/server';

const CreateCategoryPage = async({params:{lang}}:{params:{lang:string}}) => {
  const t = await getTranslations('Dashboard');
 
  return (
    <>
    <GoBackButton href='/dashboard/categoryThread' title={t('Category.Go back')}/>
      <CategoryThreadForm initialData={null} />
    </>
  );
};

export default CreateCategoryPage;
