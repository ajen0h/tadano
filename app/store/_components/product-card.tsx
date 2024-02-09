'use client';

import {Button} from '@/components/ui/button';
import useCart from '@/hooks/use-cart';
import {Heart} from 'lucide-react';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {Product} from '@prisma/client';
import {useRouter} from 'next/navigation';

interface ProductProps{

}

export const ProductCard = ({product}: any) => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();
  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const checkout = async () => {
    const res = await axios.post('api/checkout', cart.itemsStripe);
    if (res.data) {
      router.push(res.data.url);
    }
  };

  return (
    <>
      <div className="bg-white group cursor-pointer rounded-xl space-y-4">
        <h1>Hola</h1>
        <div className="aspect-square  bg-gray-100 relative">
          <div>
            {product.images[0] ? (
              <>
                <Image
                  key={product.images[0].id}
                  fill
                  src={`${product.images[0].image}`}
                  alt="image"
                  className="aspect-square object-cover rounded-md"
                />
              </>
            ) : (
              <>No hay</>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 px-5 lg:p-0">
          <div className="flex flex-col justify-start items-start lg:justify-center lg:items-center text-xl lg:text-lg relative">
            <div>{product.name}</div>
            <div className="font-bold text-destructive">{product.price} €</div>
            <Heart className="absolute top-0 right-12 w-9 h-9 sm:right-5 md:right-4 md:w-7 md:h-7" />
          </div>
        </div>
        <Button
          onClick={() => {
            //Añadir la imagen
            cart.increment(product.id, product.name);
          }}>
          Añadir
        </Button>
      </div>
      <Button onClick={() => checkout()}>Stripe</Button>
    </>
  );
};
