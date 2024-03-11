'use client';
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';
import {HiMenuAlt3} from 'react-icons/hi';
import {Separator} from '../ui/separator';
import Link from 'next/link';
import {Button} from '../ui/button';
import {GoHome} from 'react-icons/go';
import {RxExit} from 'react-icons/rx';
import {LogoutButton} from './sing-out';
import {useState} from 'react';
import {Menu} from 'lucide-react';
import {useSession} from 'next-auth/react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export const MenuMobil = () => {
  const [open, setOpen] = useState(false);

  const navLinks = [
    {
      name: 'News',
      href: '/news',
      icon: '',
    },
    {
      name: 'Fixtures',
      href: '/fixtures',
      icon: '',
    },
    {
      name: 'Forum',
      href: '/forum',
      icon: '',
    },
    {
      name: 'Store',
      href: '/store',
      icon: '',
    },
  ];

  const {data: session} = useSession();
  const pathname = usePathname();
 
  const path = pathname.split(/\/(?:es|en)\//)[1];
  const lang = pathname.split("/")[1]
  console.log(">>",lang);
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent side={'left'} className="flex flex-col rounded-xl">
          <>
            {session && (
              <div className="flex flex-row justify-start items-center gap-3">
                <div className='relative h-[40px] w-[40px]'>
                  <Image src={`${session.user?.image}`} alt={`${session.user?.name}`} fill className='rounded-full'/>
                </div>
                <div className="flex flex-col justify-start">
                  <h1 className="text-lg text-marronnegro font-bold">
                    {session.user?.name}
                  </h1>
                  <p className="text-sm text-marronnegro/70 ">
                    {session.user?.email}
                  </p>
                </div>
              </div>
            )}
          </>
          <>
            {!session ? (
              <>
                <Button variant={'ghost'} onClick={() => setOpen(false)}>
                  <Link href={'/sign-in'}>Sign In</Link>
                </Button>
                <Button onClick={() => setOpen(false)}>
                  <Link href={'/sign-up'}>Sign Up</Link>
                </Button>
              </>
            ) : null}
          </>

          <Separator />
          <div className="flex flex-col gap-2 py-3">
            {navLinks.map((link) => (
              <Button
                variant={'ghost'}
                key={link.name}
                asChild
                className="justify-start gap-4"
                onClick={() => setOpen(false)}>
                <Link href={`${lang}${link.href}`}>
                  {link.icon}
                  <h3 className="text-marronnegro font-semibold text-md">
                    {link.name}
                  </h3>
                </Link>
              </Button>
            ))}
          </div>
          <div className="h-full flex flex-col justify-end">
            <>
              <LogoutButton setOpen={setOpen} />
            </>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
