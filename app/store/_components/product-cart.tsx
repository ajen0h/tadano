'use client';

import {Button} from '@/components/ui/button';
import useCart from '@/hooks/use-cart-original';
import { Category, Color, Image, Size,Product } from '@prisma/client';
import {useEffect, useState} from 'react';


export const ProductCart = ({products}: {products: Product[]}) => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, [cart.items]);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <Button
            onClick={() => {
              
            }}></Button>
        </div>
      ))}
    </div>
  );
};
