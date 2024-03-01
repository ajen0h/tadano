'use client';

import {Category, Product} from '@prisma/client';
import {useEffect, useState} from 'react';
import {ProductCard} from './product-card';
import {Button} from '@/components/ui/button';
import {InfinityProduct, InfinityProductInitial} from '@/actions/products';

export const Store = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [visibleItems, setVisibleItems] = useState(5);
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);

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
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {showLoadingMessage && <p>Loading...</p>}
        <div className="flex justify-center items-center py-14">
          <Button onClick={loadMoreItems}>Show More</Button>
        </div>
      </section>
    </>
  );
};
