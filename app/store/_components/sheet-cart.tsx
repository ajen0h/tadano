'use client';
import {Button} from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import useCart from '@/hooks/use-cart';
import axios from 'axios';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {IoBagOutline} from 'react-icons/io5';

export const SheetCart = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();
  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
    console.log(cart.items.length);
    console.log(cart.items);
    console.log(cart.itemsStripe);
    console.log(process.env.FRONTEND_STORE_URL);
  }, [cart.items]);

  if (!isMounted) {
    return null;
  }

  const checkout = async () => {
    const res = await axios.post(
      `${process.env.FRONTEND_STORE_URL}api/checkout`,cart.items);
    console.log(res);
    if (res.data) {
      router.push(res.data.url);
    }
   
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Button asChild>
          <IoBagOutline className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between">
        <SheetHeader>
          <SheetTitle>Anita Max Wynd</SheetTitle>
          <SheetDescription>
            {cart.items.map((item) => (
              <div key={item.id}>
                <h1>{item.name}</h1>
                <p>cantidad: {item.cantidad}</p>
                <Button
                  onClick={() => {
                    cart.decrement(item.id);
                  }}>
                  decrement
                </Button>
                <Button
                  onClick={() => {
                    cart.incremetCantidad(item.id);
                  }}>
                  increment
                </Button>
              </div>
            ))}
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          {cart.items.length > 0 ? (
            <>
              <Button className="w-full" onClick={() => checkout()}>
                Stripe
              </Button>
            </>
          ) : (
            <></>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
