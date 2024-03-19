import {ProductForm} from './_components/prodcut-form';
import {getCategory} from '@/actions/category';
import {getSize} from '@/actions/size';
import {getColor} from '@/actions/color';
import {getProductById} from '@/actions/products';
import {GoBackButton} from '../../_components/goback-button';
import {getTranslations} from 'next-intl/server';

const ProductIdPage = async ({
  params,
}: {
  params: {productId: string; lang: string};
}) => {
  const t = await getTranslations('Dashboard.Product');

  const product = await getProductById(params.productId);
  const categories = await getCategory();
  const sizes = await getSize();
  const colors = await getColor();

  return (
    <div>
      <main className="px-10 py-6">
        <div className="pb-5">
          <GoBackButton href={'/dashboard/product'} title={t('Go back')} />
        </div>
        <ProductForm
          initialData={product}
          categories={categories}
          sizes={sizes}
          colors={colors}
        />
      </main>
    </div>
  );
};

export default ProductIdPage;
