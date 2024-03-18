'use client';

import {Category, Product} from '@prisma/client';
import {useEffect, useState} from 'react';
import {ProductCard} from './product-card';
import {Button} from '@/components/ui/button';
import {InfinityProduct, InfinityProductInitial} from '@/actions/products';
import Image from 'next/image';
import {useSearchParams} from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export const Store = ({success,error}:{success?:string,error?:string}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [visibleItems, setVisibleItems] = useState(5);
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);
  const searchParams = useSearchParams();


  useEffect(() => {
    
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
  };

  return (
    <>
      <section className="px-10 ">
        {/*  <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div> */}

        {/* <div className="flex justify-center items-center py-14">
          <Button onClick={loadMoreItems}>Show More</Button>
        </div> */}
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="relative h-[300px] lg:h-[600px] w-full">
              <Image
                src={'/tanjiro.jpg'}
                alt="tanjiro.jpg"
                fill
                className="object-cover rounded-br-3xl"
              />
            </div>
            <div>
              <p>Linen cushion cober</p>
              <p>$19</p>
            </div>
          </div>
        </main>
        <Toaster position="top-center" reverseOrder={false} />
      </section>
    </>
  );
};
