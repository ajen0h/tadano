import { getCategoryById } from '@/actions/category';
import { CategoryForm } from './_components/category-form';

const SizeIdPage = async ({params}: {params: {categoryId: string}}) => {
  const category = await getCategoryById(params.categoryId);
  return (
    <div>
      <CategoryForm initialData={category} />
    </div>
  );
};

export default SizeIdPage;
