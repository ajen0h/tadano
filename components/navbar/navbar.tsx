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
    <header className="fixed top-0 z-30 w-full">
      <main className="container mx-auto flex flex-row justify-between items-center text-white border-b border-white py-4">
        <div>Logo</div>
        <nav className="hidden md:block">
          <ul className="flex flex-row">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Button
                  variant={'ghost'}
                  key={link.name}
                  asChild
                  className="justify-start px-4">
                  <Link href={link.href}>
                    <h3 className="font-semibold text-md">
                      {link.name}
                    </h3>
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>

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
      </main>
    </header>
  );
};
