import {GoBackButton} from '../../_components/goback-button';
import {getCategory} from '@/actions/category';
import {getSize} from '@/actions/size';
import {getColor} from '@/actions/color';
import {ProductForm} from '../[productId]/_components/prodcut-form';
import { getTranslations } from 'next-intl/server';

const CreateProductPage = async({params:{lang}}:{params:{lang:string}}) => {
  const t = await getTranslations('Dashboard.Product');

  const categories = await getCategory();
  const sizes = await getSize();
  const colors = await getColor();
  return (
    <div>
      <GoBackButton href={'/dashboard/product'} title={t("Go back")} />
      <ProductForm
        initialData={null}
        categories={categories}
        colors={colors}
        sizes={sizes}
      />
    </div>
  );
};

export default CreateProductPage;
