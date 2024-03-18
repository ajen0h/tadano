'use client';

import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';
import {Separator} from '../ui/separator';
import {Button} from '../ui/button';
import {LogoutButton} from './sing-out';
import {useState} from 'react';
import {Menu} from 'lucide-react';
import {useSession} from 'next-auth/react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import NavigationLink from './navigation-link';
import { LenguageDropDown } from '../lenguage-dropdown';
import { usePathname } from '@/navigation';

export const MenuMobil = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations('Links');

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
    {
      name: `${t('Team')}`,
      href: '/team',
      icon: '',
    },
  ];

  const {data: session} = useSession();
  const pathname=usePathname()
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Menu className='w-7 h-7' />
        </SheetTrigger>
        <SheetContent side={'left'} className="flex flex-col rounded-xl">
          <>
            {session && (
              
                  <div className="flex flex-row justify-start items-center gap-3">
                    <div className="relative h-[40px] w-[40px]">
                      <Image
                        src={`${session.user?.image}`}
                        alt={`${session.user?.name}`}
                        fill
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex flex-col justify-start">
                      <h1 className="text-lg text-marronnegro font-bold">
                        {session.user?.name}
                      </h1>
                      <p className="text-sm text-marronnegro/70 ">
                        {session.user?.email}
                      </p>
                    </div>
                    <div>
                      <LenguageDropDown/>
                    </div>
                  </div>
               
            )}
          </>
          <>
            {!session ? (
              <>
                <Button variant={'ghost'} onClick={() => setOpen(false)}>
                  <NavigationLink href={`/sign-in`}>Sign In</NavigationLink>
                </Button>
                <Button onClick={() => setOpen(false)}>
                  <NavigationLink href={`/sign-up`}>Sign Up</NavigationLink>
                </Button>
              </>
            ) : null}
          </>

          <Separator />
          <div className="flex flex-col gap-2 py-3">
            {navLinks.map((link) => (
              <Button
                variant={'ghost'}
                key={link.name}
                asChild
                className={`justify-start gap-4 ${pathname===link.href ? "bg-pink-400 text-white":""}`}
                onClick={() => setOpen(false)}>
                <NavigationLink href={`${link.href}`}>
                  {link.icon}
                  <h3 className={`text-marronnegro font-semibold text-md ${pathname===link.href ? " text-white":""}`}>
                    {link.name}
                  </h3>
                </NavigationLink>
              </Button>
            ))}
          </div>
          <div className="h-full flex flex-col justify-end">
            <>
              <LogoutButton setOpen={setOpen} />
            </>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
