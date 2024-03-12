import {ProductForm} from './_components/prodcut-form';
import {getCategory} from '@/actions/category';
import {getSize} from '@/actions/size';
import {getColor} from '@/actions/color';
import {getProductById} from '@/actions/products';
import {GoBackButton} from '../../_components/goback-button';

const ProductIdPage = async ({params}: {params: {productId: string,lang:string}}) => {
  const dictionary=await import( `@/app/dictionaries/${params.lang}.json`).then(m=>m.default)
  const product = await getProductById(params.productId);
  const categories = await getCategory();
  const sizes = await getSize();
  const colors = await getColor();

  return (
    <div>
      <GoBackButton href={'/dashboard/product'} title={dictionary.General["Go back"]}/>
      <ProductForm
        initialData={product}
        categories={categories}
        sizes={sizes}
        colors={colors}
      />
    </div>
  );
};

export default ProductIdPage;
