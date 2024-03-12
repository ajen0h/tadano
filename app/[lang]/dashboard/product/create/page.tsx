import {GoBackButton} from '../../_components/goback-button';
import {getCategory} from '@/actions/category';
import {getSize} from '@/actions/size';
import {getColor} from '@/actions/color';
import {ProductForm} from '../[productId]/_components/prodcut-form';

const CreatePlayerPage = async({params:{lang}}:{params:{lang:string}}) => {
  const dictionary=await import( `@/app/dictionaries/${lang}.json`).then(m=>m.default)
  const categories = await getCategory();
  const sizes = await getSize();
  const colors = await getColor();
  return (
    <div>
      <GoBackButton href={'/dashboard/product'} title={dictionary.General["Go back"]} />
      <ProductForm
        initialData={null}
        categories={categories}
        colors={colors}
        sizes={sizes}
      />
    </div>
  );
};

export default CreatePlayerPage;
