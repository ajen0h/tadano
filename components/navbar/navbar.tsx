import {MenuMobil} from './menu-mobil';
import {UserMenu} from './user-menu';
import {SheetCart} from '@/app/[locale]/store/_components/sheet-cart';
import {useSession} from 'next-auth/react';
import {AuthButtons} from './auth-buttons';
import {useTranslations} from 'next-intl';
import {Link, usePathname} from '@/navigation';
import NavigationLink from './navigation-link';
import {LenguageDropDown} from '../lenguage-dropdown';
import {getTranslations} from 'next-intl/server';
import {auth} from '@/auth';
import {SerchLinkNav} from './serch-link-nav';
import Image from 'next/image';
import {Menu} from 'lucide-react';
export const NavBar = async () => {
  const t = await getTranslations('Navbar');
  const session = await auth();
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
      name: `${t('Store')}`,
      href: '/team',
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
  return (
    <>
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
            <SerchLinkNav />
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
            <div className="flex flex-row justify-center items-center gap-1">
              <SheetCart />
              <p className="text-xs">{t('Cart')}</p>
            </div>
            <div className="hidden lg:block">
              <LenguageDropDown />
            </div>
          </div>
          <div></div>
        </main>
        <div className="flex flex-row justify-center items-center gap-3"></div>
      </header>
      
    </>
  );
};
