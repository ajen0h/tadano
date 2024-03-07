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
import useCart from '@/hooks/use-cart-original';
import axios from 'axios';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {IoBagOutline} from 'react-icons/io5';

export const SheetCart = () => {
  const session = useSession();
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();
  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
  }, [cart.items]);

  if (!isMounted) {
    return null;
  }

  const checkout = async () => {
    const res = await axios.post(
      `${process.env.FRONTEND_STORE_URL}api/checkout`,
      cart.items
    );

    if (res.data) {
      router.push(res.data.url);
    }
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={"ghost"}>
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
              {session.data?.user ? (
                <>
                  <Button className="w-full" onClick={() => checkout()}>
                    Stripe
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="w-full bg-green-500"
                    onClick={() => router.push('/sign-in')}>
                    Sign In
                  </Button>
                </>
              )}
            </>
          ) : null}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
