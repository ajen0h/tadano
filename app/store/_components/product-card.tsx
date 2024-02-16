'use client';

import {Button} from '@/components/ui/button';
import useCart from '@/hooks/use-cart';
import {Heart} from 'lucide-react';
import Image from 'next/image';
import {Image as PrismaImage, Product} from '@prisma/client';
import {useEffect, useState} from 'react';
import axios from 'axios';

import {useRouter} from 'next/navigation';
import Link from 'next/link';

interface ProductProps {
  product: Product & {
    images: PrismaImage[];
  };
}

export const ProductCard = ({product}: ProductProps) => {
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
    <><Link href={`/products/${product.id}`}>
      <div className="bg-white group cursor-pointer rounded-xl space-y-4 hover:shadow-xl">
        <div className="aspect-square  bg-gray-100 relative">
          <div>
            {product.images[0] ? (
              <>
                <Image
                  key={product.images[0].id}
                  fill
                  src={`${product.images[0].url}`}
                  alt="image"
                  className="aspect-square object-cover rounded-md"
                  />
              </>
            ) : (
              <>No hay</>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1  px-5 lg:p-0">
          <div className="flex flex-col justify-start items-start  text-sm relative">
            <div>{product.name}</div>
            <div className="font-bold text-destructive">{product.price} €</div>
          </div>
        </div>
        {/* <Button
          onClick={() => {
            //Añadir la imagen
            cart.increment(product.id, product.name);
          }}>
          Añadir
        </Button> */}
      </div>
      </Link>
      {/*       <Button onClick={() => checkout()}>Stripe</Button>
       */}
    </>
  );
};
