'use client';

import {usePathname} from '@/navigation';
import NavigationLink from './navigation-link';
import {useTranslations} from 'next-intl';

export const SerchLinkNav = () => {
  const t = useTranslations('Navbar');

  const pathname = usePathname();
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

  return (
    <main className="h-full flex justify-center items-center gap-5 text-sm ">
      {navLinks.map((link) => (
        <NavigationLink
          key={link.name}
          href={link.href}
          className={`${
            link.href === `${pathname}`
              ? 'font-extrabold border-b-2 border-black '
              : ''
          }`}>
          {link.name}
        </NavigationLink>
      ))}
    </main>
  );
};
