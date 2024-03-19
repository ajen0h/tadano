'use client';

import {Category, Product} from '@prisma/client';
import {useEffect, useState} from 'react';
import {ProductCard} from './product-card';
import {Button} from '@/components/ui/button';
import {InfinityProduct, InfinityProductInitial} from '@/actions/products';
import Image from 'next/image';
import {useSearchParams} from 'next/navigation';
import toast, {Toaster} from 'react-hot-toast';

export const Store = ({success, error}: {success?: string; error?: string}) => {
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
      <section className="px-10 xl:container">
        {/*  <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div> */}

        {/* <div className="flex justify-center items-center py-14">
          <Button onClick={loadMoreItems}>Show More</Button>
        </div> */}
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-6 cursor-pointer">
          <div className=''>
            <div className="relative h-[300px] lg:h-[500px] w-full overflow-hidden rounded-t-3xl">
              <Image
                src={'/tanjiro.jpg'}
                alt="tanjiro.jpg"
                fill
                className="object-cover   overflow-hidden hover:scale-105 cursor-pointer ease-in duration-500"
              />
            </div>
            <div className="border rounded-b-3xl p-4 flex flex-col justify-between items-start gap-8">
              <div>
                <p className="font-bold text-xl">Linen cushion cober</p>
              </div>
              <div className='flex flex-row justify-between items-center w-full'>
                <p className="font-semibold text-xl">$19</p>
                <Button>Add cart</Button>
              </div>
            </div>
          </div>
        </main>
        <Toaster position="top-center" reverseOrder={false} />
      </section>
    </>
  );
};
