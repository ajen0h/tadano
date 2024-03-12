import {CategoryForm} from '../[categoryId]/_components/category-form';
import { GoBackButton } from '../../_components/goback-button';

const CreateCategoryPage = async({params:{lang}}:{params:{lang:string}}) => {
  const dictionary=await import( `@/app/dictionaries/${lang}.json`).then(m=>m.default)
  return (
    <>
    <GoBackButton href='/dashboard/category' title={dictionary.General["Go back"]}/>
      <CategoryForm initialData={null} />
    </>
  );
};

export default CreateCategoryPage;
