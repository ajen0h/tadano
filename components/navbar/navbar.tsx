'use client';
import {MenuMobil} from './menu-mobil';
import Link from 'next/link';
import {UserMenu} from './user-menu';
import {SheetCart} from '@/app/[lang]/store/_components/sheet-cart';
import {useSession} from 'next-auth/react';
import {AuthButtons} from './auth-buttons';
import {usePathname} from 'next/navigation';
import {useDictionary} from '@/lib/dictionary-provider';
import {Locale} from '@/i18n.config';
import {useLang} from '@/hooks/use-lang';

export const NavBar = () => {
  const dictionary = useDictionary();
  const session = useSession();
  const {lang, path} = useLang();
  console.log(path);
  const navLinks = [
    {
      name: `${dictionary.Links.News}`,
      href: '/news',
      icon: '',
    },
    {
      name: `${dictionary.Links['Fixtures']}`,
      href: '/fixtures',
      icon: '',
    },
    {
      name: `${dictionary.Links['Forum']}`,
      href: '/forum',
      icon: '',
    },
    {
      name: `${dictionary.Links['Store']}`,
      href: '/store',
      icon: '',
    },
  ];

  return (
    <header className="top-0 z-30 w-full border">
      <main className="grid grid-cols-3 py-5">
        <div className="flex flex-row justify-center items-center gap-3">
          <div className="flex lg:hidden justify-center items-center">
            <MenuMobil />
          </div>
          <div className="hidden lg:block font-bold text-xl">
            <Link href={`/${lang}/`}>Logo</Link>
          </div>
        </div>
        <div className="col-start-2 flex flex-row justify-center items-center font-bold text-xl lg:hidden">
          <Link href={`/${lang}/`}>Logo</Link>
        </div>
        <div className="hidden lg:block ">
          <main className="h-full flex justify-center items-center gap-5 text-sm ">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={`/${lang}${link.href}`}
                className={`${
                  link.href === `/${path}`
                    ? 'font-bold border-b-2 border-black'
                    : ''
                }`}>
                {link.name}
              </Link>
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

          <SheetCart />
        </div>
      </main>
      <div className="flex flex-row justify-center items-center gap-3">
        <Link href={`/es/${path ? path : ''}`}>Español</Link>
        <Link href={`/en/${path ? path : ''}`}>Ingles</Link>
      </div>
    </header>
  );
};
