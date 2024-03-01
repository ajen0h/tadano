import {getProducts} from '@/actions/products';
import useCart from '@/hooks/use-cart';
import {ProductCart} from './_components/product-cart';
import {getCategory} from '@/actions/category';
import {getColor} from '@/actions/color';
import {ProductCard} from './_components/product-card';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import { Store } from './_components/store';

const StorePage = async () => {
  const products = await getProducts();
  const categories = await getCategory();
  const colors = await getColor();

  return (
    <>
      <Store/>
    </>
  );
};

export default StorePage;
