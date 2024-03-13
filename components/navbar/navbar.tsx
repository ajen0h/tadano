'use client';
import {MenuMobil} from './menu-mobil';
import {UserMenu} from './user-menu';
import {SheetCart} from '@/app/[locale]/store/_components/sheet-cart';
import {useSession} from 'next-auth/react';
import {AuthButtons} from './auth-buttons';
import {useTranslations} from 'next-intl';
import {Link, usePathname} from '@/navigation';
import NavigationLink from './navigation-link';
export const NavBar = () => {
  const t = useTranslations('Navbar');
  const session = useSession();
  const navLinks = [
    {
      name: `${t('News')}`,
      href: '/news',
      icon: '',
    },
    {
      name: `${t('Fixtures')}`,
      href: '/fixtures',
      icon: '',
    },
    {
      name: `${t('Forum')}`,
      href: '/forum',
      icon: '',
    },
    {
      name: `${t('Store')}`,
      href: '/store',
      icon: '',
    },
  ];

  const pathname = usePathname();

  return (
    <header className="top-0 z-30 w-full border">
      <main className="grid grid-cols-3 py-5">
        <div className="flex flex-row justify-center items-center gap-3">
          <div className="flex lg:hidden justify-center items-center">
            <MenuMobil />
          </div>
          <div className="hidden lg:block font-bold text-xl">
            <NavigationLink href={`/`}>Logo</NavigationLink>
          </div>
        </div>
        <div className="col-start-2 flex flex-row justify-center items-center font-bold text-xl lg:hidden">
          <NavigationLink href={`/`}>Logo</NavigationLink>
        </div>
        <div className="hidden lg:block ">
          <main className="h-full flex justify-center items-center gap-5 text-sm ">
            {navLinks.map((link) => (
              <NavigationLink
                key={link.name}
                href={link.href}
                className={`${
                  link.href === `${pathname}`
                    ? 'font-bold border-b-2 border-black'
                    : ''
                }`}>
                {link.name}
              </NavigationLink>
            ))}
          </main>
        </div>
        <div className="col-start-3 flex flex-row justify-center items-center gap-4">
          {session?.data?.user?.id ? (
            <>
              <UserMenu />
            </>
          ) : (
            <div className="hidden lg:block ">
              <AuthButtons />
            </div>
          )}
          <div className="flex flex-row justify-center items-center gap-1">
            <SheetCart />
            <p className='text-xs'>{t('Cart')}</p>
          </div>
        </div>
      </main>
      <div className="flex flex-row justify-center items-center gap-3">
        {/* <Link href={`/es/${path ? path : ''}`}>Español</Link>
        <Link href={`/en/${path ? path : ''}`}>Ingles</Link> */}
      </div>
    </header>
  );
};
