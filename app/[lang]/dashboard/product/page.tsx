import { getCategory } from '@/actions/category';
import {ProductForm} from './[productId]/_components/prodcut-form';
import { getSize } from '@/actions/size';
import { getColor } from '@/actions/color';

const ProductPage = async () => {
    const categories = await getCategory();
    const sizes = await getSize();
    const colors = await getColor();
  return (
    <div>
      <ProductForm initialData={null} categories={categories} colors={colors} sizes={sizes}  />
    </div>
  );
};

export default ProductPage;
