import {MenuMobil} from './menu-mobil';
import {Button} from '../ui/button';
import Link from 'next/link';
import {UserMenu} from './user-menu';
import {Menu, ShoppingBagIcon, User} from 'lucide-react';
import {SheetCart} from '@/app/store/_components/sheet-cart';
import {Session} from 'next-auth';
import {useSession} from 'next-auth/react';
import {auth} from '@/auth';
import {PiUser} from 'react-icons/pi';
import {AuthButtons} from './auth-buttons';

export const NavBar = async () => {
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
  const session = await auth();
  return (
    <header className="top-0 z-30 w-full border">
      <main className="grid grid-cols-3 py-5">
        <div className="flex flex-row justify-center items-center gap-3">
          <div className="flex lg:hidden justify-center items-center">
            <MenuMobil />
          </div>
          <div className="hidden lg:block font-bold text-xl">
            <Link href={'/'}>Logo</Link>
          </div>
        </div>
        <div className="col-start-2 flex flex-row justify-center items-center font-bold text-xl lg:hidden">
          <Link href={'/'}>Logo</Link>
        </div>
        <div className="hidden lg:block ">
          <main className="h-full flex justify-center items-center gap-5 text-sm ">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                {link.name}
              </Link>
            ))}
          </main>
        </div>
        <div className="col-start-3 flex flex-row justify-center items-center gap-4">
          {session?.user?.id ? (
            <>
              <UserMenu />
            </>
          ) : (
            <div className="hidden lg:block ">
              <AuthButtons />
            </div>
          )}

          <SheetCart />
        </div>
      </main>
    </header>
  );
};
