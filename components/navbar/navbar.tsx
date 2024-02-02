'use client';

import {SignedIn, SignedOut, UserButton} from '@clerk/nextjs';
import {MenuMobil} from './menu-mobil';
import {Button} from '../ui/button';
import Link from 'next/link';

export const NavBar = () => {
  const navLinks = [
    {
      name: 'Home',
      href: '/',
      icon: '',
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
    <header className="flex flex-row justify-between py-6">
      <div className="text-marronnegro font-bold text-xl flex flex-row items-center justify-center">
        Navbar
      </div>
      <div className="hidden md:block">
        {navLinks.map((link) => (
          <Button
            variant={'ghost'}
            key={link.name}
            asChild
            className="justify-start gap-4">
            <Link href={link.href}>
              <h3 className="text-marronnegro font-semibold text-md">
                {link.name}
              </h3>
            </Link>
          </Button>
        ))}
      </div>
      <div className="flex flex-row items-center justify-center gap-4">
        <div className="hidden md:flex gap-2">
          <SignedOut>
            <Button variant={'ghost'} size={'sm'}>
              <Link href={'/sign-in'}>Sign In</Link>
            </Button>
            <Button size={'sm'}>Sign Out</Button>
          </SignedOut>
        </div>
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {userButtonAvatarBox: {width: 35, height: 35}},
            }}
          />
        </SignedIn>
        <div className="md:hidden block">
          <MenuMobil />
        </div>
      </div>
    </header>
  );
};
