import {ProductForm} from './_components/prodcut-form';
import {getCategory} from '@/actions/category';
import {getSize} from '@/actions/size';
import {getColor} from '@/actions/color';
import {getProductById} from '@/actions/products';

const ProductIdPage = async ({params}: {params: {productId: string}}) => {
  const product = await getProductById(params.productId);
  const categories = await getCategory();
  const sizes = await getSize();
  const colors = await getColor();

  return (
    <div>
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
