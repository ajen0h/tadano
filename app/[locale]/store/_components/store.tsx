'use client';

import {Category, Color, Image as ImagePrisma, Product, Size} from '@prisma/client';
import {useEffect, useState} from 'react';
import {ProductCard} from './product-card';
import {Button} from '@/components/ui/button';
import {InfinityProduct, InfinityProductInitial} from '@/actions/products';
import Image from 'next/image';
import {useSearchParams} from 'next/navigation';
import toast, {Toaster} from 'react-hot-toast';
import { HeaderStore } from './header-store';

interface StoreProps {
  products: Product & {
    size: Size;
    color: Color;
    category: Category;
    images: ImagePrisma[];
  };
  categories:Category[]
}

export const Store = ({
  categories,
  products,
}: any) => {
  /*  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [visibleItems, setVisibleItems] = useState(5);
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);
  const searchParams = useSearchParams(); */

  /*  useEffect(() => {
    loadInitialItems();
  }, []);

  const loadInitialItems = async () => {
    setLoading(true);
    setShowLoadingMessage(true);

    const initialItems = await InfinityProductInitial();
    setProducts(initialItems);
    setLoading(false);
    setShowLoadingMessage(false);
  };

  const loadMoreItems = async () => {
    setLoading(true);
    setShowLoadingMessage(true);

    const newItems = await InfinityProduct(products.length);
    setProducts([...products, ...newItems]);
    setLoading(false);
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 5);
    setLoading(false);
    setShowLoadingMessage(false);
  }; */

  return (
    <>
    <HeaderStore categories={categories}/>
      <section className="px-10 xl:container">
        {/*  <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
          
        </div> */}

        {/* <div className="flex justify-center items-center py-14">
          <Button onClick={loadMoreItems}>Show More</Button>
        </div> */}
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-6 cursor-pointer">
          {products.map((product:any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </main>
        <Toaster position="top-center" reverseOrder={false} />
      </section>
    </>
  );
};
