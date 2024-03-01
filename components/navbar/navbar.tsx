'use client';

import {SignedIn, SignedOut, UserButton} from '@clerk/nextjs';
import {MenuMobil} from './menu-mobil';
import {Button} from '../ui/button';
import Link from 'next/link';
import {UserMenu} from './user-menu';

export const NavBar = () => {
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
    <header className="top-0 z-30 w-full">
      <main className="mx-auto flex flex-row justify-between items-center text-black border-b border-black py-4 px-5">
        <div>
          <Link href={'/'}>Logo</Link>
        </div>
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
                    <h3 className="font-semibold text-md">{link.name}</h3>
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
            {/* <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {userButtonAvatarBox: {width: 35, height: 35}},
              }}
            /> */}
            <UserMenu />
          </SignedIn>
          <div className="md:hidden block">
            <MenuMobil />
          </div>
        </div>
      </main>
    </header>
  );
};
