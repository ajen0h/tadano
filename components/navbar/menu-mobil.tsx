'use client';
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';
import {HiMenuAlt3} from 'react-icons/hi';
import {Separator} from '../ui/separator';
import Link from 'next/link';
import {SignedIn, SignedOut, UserButton, useUser} from '@clerk/nextjs';
import {Button} from '../ui/button';
import {GoHome} from 'react-icons/go';
import {RxExit} from 'react-icons/rx';
import { LogoutButton } from './sing-out';
import { useState } from 'react';
import { Menu } from 'lucide-react';

export const MenuMobil = () => {
  const [open, setOpen] = useState(false)
  const {user} = useUser();
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

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent side={"left"} className="flex flex-col rounded-xl">
          <SignedIn>
            <div className="flex flex-row justify-start items-center gap-3">
              <UserButton
                appearance={{
                  elements: {userButtonAvatarBox: {width: 50, height: 50}}
                }}
              />
              <div className="flex flex-col justify-start">
                <h1 className="text-lg text-marronnegro font-bold">
                  {user?.username}
                </h1>
                <p className="text-sm text-marronnegro/70 ">
                  {user?.emailAddresses[0].emailAddress}
                </p>
              </div>
            </div>
          </SignedIn>
          <SignedOut>
            <Button variant={'ghost'} >
              <Link href={'/sign-in'}>Sign In</Link>
            </Button>
            <Button>Sign Out</Button>
          </SignedOut>
          <SignedOut></SignedOut>
          <Separator />
          <div className="flex flex-col gap-2 py-3">
            {navLinks.map((link) => (
              <Button
                variant={'ghost'}
                key={link.name}
                asChild
                className="justify-start gap-4"
                onClick={()=>setOpen(false)}>
                <Link href={link.href}>
                  {link.icon}
                  <h3 className="text-marronnegro font-semibold text-md">
                    {link.name}
                  </h3>
                </Link>
              </Button>
            ))}
          </div>
          <div className="h-full flex flex-col justify-end">
            <SignedIn>
              <LogoutButton setOpen={setOpen}/>
            </SignedIn>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
