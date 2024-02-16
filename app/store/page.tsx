import {getProducts} from '@/actions/products';
import useCart from '@/hooks/use-cart';
import {ProductCart} from './_components/product-cart';
import {getCategory} from '@/actions/category';
import {getColor} from '@/actions/color';
import {ProductCard} from './_components/product-card';
import {Button} from '@/components/ui/button';
import Link from 'next/link';

const StorePage = async () => {
  const products = await getProducts();
  const categories = await getCategory();
  const colors = await getColor();

  return (
    <>
      <section>
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {products.map((product) => (
           
              <ProductCard key={product.id} product={product} />
            ))}
            
          </div>
        </section>
      
    </>
  );
};

export default StorePage;
