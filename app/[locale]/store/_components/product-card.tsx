'use client';

import {Button} from '@/components/ui/button';
import useCart from '@/hooks/use-cart-original';
import {Heart} from 'lucide-react';
import Image from 'next/image';
import {Category, Color, Image as PrismaImage, Product, Size} from '@prisma/client';
import {useEffect, useState} from 'react';
import axios from 'axios';

import {useRouter} from 'next/navigation';
import Link from 'next/link';
import toast, {Toaster} from 'react-hot-toast';
import NavigationLink from '@/components/navbar/navigation-link';

interface ProductProps {
  product: Product & {
    images: PrismaImage[];
    size:Size,
    color: Color,
    category: Category,
  };
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

  return (
    <>
      <div className="flex flex-col gap-2">
        <NavigationLink href={`/products/${product.id}`}>
          <div className="bg-white group cursor-pointer rounded-xl hover:shadow-xl">
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
            <div className="grid grid-cols-1 px-5 py-4">
              <div className="flex flex-col justify-start items-start  text-sm relative">
                <div>{product.name}</div>
                <div className="font-bold text-destructive">
                  {product.price} €
                </div>
              </div>
            </div>
          </div>
          <Button
          
            variant={'outline'}
            className="w-full"
            onClick={(e: React.SyntheticEvent) => {
              //Añadir la imagen
              e.stopPropagation();
              e.preventDefault()
              cart.increment(product.id, product.name, product.images[0].url);
              toast.success("Product added")
            }}>
            Añadir
          </Button>
        </NavigationLink>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};
