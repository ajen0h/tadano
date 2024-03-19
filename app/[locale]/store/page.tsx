import {Terminal} from 'lucide-react';
import {Store} from './_components/store';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {AlertComponent} from '@/components/alert-component';
import {getProducts, getProductsSheact} from '@/actions/products';
import { getCategory } from '@/actions/category';
import toast from 'react-hot-toast';
const StorePage = async ({
  searchParams: {query, sort, category,success,canceled},
}: {
  searchParams: {query?: string; sort?: string; category?: string,success?:string,canceled?:string};
}) => {
  const categories=await getCategory()
  const products = await getProductsSheact(query,category);

  return (
    <>
      <Store products={products} categories={categories} />
      {/* <Alert/> */}:

     
      
    </>
  );
};

export default StorePage;
