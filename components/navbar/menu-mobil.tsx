'use client';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {HiMenuAlt3} from 'react-icons/hi';
import {Separator} from '../ui/separator';
import Link from 'next/link';
import {SignedIn, SignedOut, UserButton, useUser} from '@clerk/nextjs';
import {Button} from '../ui/button';
import {GoHome} from 'react-icons/go';
import {RxExit} from 'react-icons/rx';

export const MenuMobil = () => {
  const {user} = useUser();
  const navLinks = [
    {
      name: 'Home',
      href: '/',
      icon: <GoHome className="w-4 h-4" />,
    },
    {
      name: 'About',
      href: '/about',
      icon: '',
    },
    {
      name: 'Test',
      href: '/test',
      icon: '',
    },
  ];

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <HiMenuAlt3 className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent className="flex flex-col rounded-xl">
          <SignedIn>
            <div className="flex flex-row justify-start items-center gap-3">
              <UserButton
                appearance={{
                  elements: {userButtonAvatarBox: {width: 50, height: 50}},
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
            <Button variant={'ghost'}>
              <Link href={"/sign-in"}>Sign In</Link>
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
                className="justify-start gap-4">
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
              <Button variant={'ghost'} className="justify-start gap-4">
                <RxExit className="rotate-180" />
                <h3>Sign Out</h3>
              </Button>
            </SignedIn>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};