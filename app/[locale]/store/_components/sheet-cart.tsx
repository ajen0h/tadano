'use client';
import {ModalAuth} from '@/components/modal-auth';
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
import Image from 'next/image';
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
    <>
      <Sheet>
        <SheetTrigger>
          <Button variant={'ghost'} className='p-0 m-0'>
            <IoBagOutline className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col justify-between">
          <SheetHeader>
            <SheetTitle>Anita Max Wynd</SheetTitle>
            <SheetDescription>
              {cart.items.map((item) => (
                <div key={item.id}>
                  <header className="grid grid-cols-2">
                    <div className="relative h-[60px]">
                      <Image
                        src={`${item.image}`}
                        alt={`${item.name}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-center w-full text-xl font-bold">
                        {item.name}
                      </p>
                      <div className="flex flex-row justify-center items-center gap-3">
                        <Button
                          variant={'ghost'}
                          onClick={() => {
                            cart.decrement(item.id);
                          }}>
                          -
                        </Button>
                        <p>{item.cantidad}</p>
                        <Button
                          variant={'ghost'}
                          onClick={() => {
                            cart.incremetCantidad(item.id);
                          }}>
                          +
                        </Button>
                      </div>
                    </div>
                  </header>
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
                  <></>
                )}
              </>
            ) : null}
          </SheetFooter>
        </SheetContent>
      </Sheet>
{/*       <ModalAuth />
 */}    </>
  );
};
