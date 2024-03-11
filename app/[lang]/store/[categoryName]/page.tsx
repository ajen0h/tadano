import {getProductByCategory} from '@/actions/products';
import {ProductCard} from '../_components/product-card';

interface CategoryProps {
  params: {
    categoryName: string;
  };
}
const CategoryPage = async ({params}: CategoryProps) => {
  const productCategory = await getProductByCategory(params.categoryName);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {productCategory.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default CategoryPage;
