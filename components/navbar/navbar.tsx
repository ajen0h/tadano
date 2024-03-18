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
import {Menu, User} from 'lucide-react';
import {Button} from '../ui/button';
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
      {/* <header className="top-0 z-30 w-full border">
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
      </header> */}
      <div className="block lg:hidden">
        <header className=" shadow-xl">
          <main className="grid grid-cols-3 place-items-center">
            <div className="flex justify-center items-center">
              <MenuMobil />
            </div>

            <NavigationLink href="/">
              <div className="flex justify-center items-center cursor-pointer">
                <div className="relative h-[90px] w-[90px]">
                  <Image
                    src={`/logo.png`}
                    alt=""
                    fill
                    className="object-cover "
                  />
                </div>
              </div>
            </NavigationLink>

            <div className="flex flex-row justify-center items-center gap-5">
              {session?.user?.id ? (
                <>
                  <UserMenu />
                </>
              ) : (
                <>
                  <NavigationLink href={'/sign-in'}>
                    <User className="w-7 h-7" />
                  </NavigationLink>
                </>
              )}

              <div className="flex flex-row justify-center items-center gap-1">
                <SheetCart />
                <p className="text-xs">{t('Cart')}</p>
              </div>
              <div className="hidden lg:block">
                <LenguageDropDown />
              </div>
            </div>
          </main>
        </header>
      </div>

      <header className="hidden lg:block shadow-xl">
        <main className="grid grid-cols-3 place-items-center">
          <div className="col-start-2 cursor-pointer">
            <NavigationLink href="/">
              <div className="flex justify-center items-center ">
                <div className="relative h-[120px] w-[120px]">
                  <Image
                    src={`/logo.png`}
                    alt=""
                    fill
                    className="object-cover "
                  />
                </div>
                <p className="text-2xl font-bold">Atlético Barril</p>
              </div>
            </NavigationLink>
          </div>

          <div className="flex flex-row justify-center items-center gap-5">
            <Button
              asChild
              className="bg-transparent border border-pink-400 text-black felx flex-row justify-center items-center gap-3 hover:bg-pink-400 hover:text-white">
              {session?.user?.id ? (
                <>
                  <UserMenu />
                </>
              ) : (
                <>
                  <NavigationLink href={'/sign-in'}>
                    <User className="w-7 h-7" />
                    <p className="">SignIn / SignUp</p>
                  </NavigationLink>
                </>
              )}
            </Button>
            <div className="flex flex-row justify-center items-center gap-1">
              <SheetCart />
              <p className="text-xs">{t('Cart')}</p>
            </div>
            <div className="hidden lg:block">
              <LenguageDropDown />
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-4 col-span-3">
            <SerchLinkNav />
          </div>
        </main>
      </header>
    </>
  );
};
