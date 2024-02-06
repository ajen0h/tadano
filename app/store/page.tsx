import {getProducts} from '@/actions/products';
import useCart from '@/hooks/use-cart';
import {ProductCart} from './_components/product-cart';
import {getCategory} from '@/actions/category';
import {getColor} from '@/actions/color';
import {ProductCard} from './_components/product-card';

const StorePage = async () => {
  const products = await getProducts();
  const categories = await getCategory();
  const colors = await getColor();

  /* category: {
    id: '6e9cc56d-eb61-406b-9ec3-c9be4c92f8b3',
    name: 'T-Shirt',
    createdAt: 2024-01-18T18:29:37.622Z,
    updatedAt: 2024-01-18T18:29:37.622Z
  }, */

  type Imagen = {
    id: string;
    image: string;
  };

  const imagen = [
    {id: '1111', image: 'https'},
    {id: '12', image: 'https'},
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product:any) => (
          <ProductCard key={product.id} product={product} />
        ))}
        <h1>Hola</h1>
      </div>
    </div>
  );
};

export default StorePage;
