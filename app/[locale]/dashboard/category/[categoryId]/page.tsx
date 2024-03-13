import { getCategoryById } from '@/actions/category';
import { CategoryForm } from './_components/category-form';
import { GoBackButton } from '../../_components/goback-button';
import {getTranslations} from 'next-intl/server';


const CategoryIdPage = async ({params}: {params: {categoryId: string,lang:string}}) => {
  const t = await getTranslations('Dashboard');
  const category = await getCategoryById(params.categoryId);
  return (
    <div>
      <GoBackButton href={"/dashboard/category/"} title={t('Category.Go back')}/>
      <CategoryForm initialData={category} />
    </div>
  );
};

export default CategoryIdPage;
