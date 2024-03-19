'use client';

import {Button} from '@/components/ui/button';
import useCart from '@/hooks/use-cart-original';
import {Heart} from 'lucide-react';
import Image from 'next/image';
import {
  Category,
  Color,
  Image as PrismaImage,
  Product,
  Size,
} from '@prisma/client';
import {useEffect, useState} from 'react';
import axios from 'axios';

import {useRouter} from 'next/navigation';
import Link from 'next/link';
import toast, {Toaster} from 'react-hot-toast';
import NavigationLink from '@/components/navbar/navigation-link';

interface ProductProps {
  product: Product & {
    images: PrismaImage[];
    size: Size;
    color: Color;
    category: Category;
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
      <div className="">
        <div className="relative h-[300px] lg:h-[500px] w-full overflow-hidden rounded-t-3xl">
          
          <Image
            src={`${product.images[0].url}`}
            alt="tanjiro.jpg"
            fill
            className="object-cover   overflow-hidden hover:scale-105 cursor-pointer ease-in duration-500"
          />
        </div>
        <div className="border rounded-b-3xl p-4 flex flex-col justify-between items-start gap-8">
          <div>
            <p className="font-bold text-xl">{product.name}</p>
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <p className="font-semibold text-xl">{product.price} €</p>
            <Button
              variant={'outline'}
              className=""
              onClick={(e: React.SyntheticEvent) => {
                //Añadir la imagen
                e.stopPropagation();
                e.preventDefault();
                cart.increment(product.id, product.name, product.images[0].url);
                toast.success('Product added');
              }}>
              Añadir a la cesta
            </Button>
          </div>
        </div>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

{
  /*  */
}
