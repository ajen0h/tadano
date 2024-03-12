import { getCategoryById } from '@/actions/category';
import { CategoryForm } from './_components/category-form';
import { GoBackButton } from '../../_components/goback-button';


const CategoryIdPage = async ({params}: {params: {categoryId: string,lang:string}}) => {
  const dictionary=await import( `@/app/dictionaries/${params.lang}.json`).then(m=>m.default)
  const category = await getCategoryById(params.categoryId);
  return (
    <div>
      <GoBackButton href={"/dashboard/category/"} title={dictionary.General["Go back"]}/>
      <CategoryForm initialData={category} />
    </div>
  );
};

export default CategoryIdPage;
