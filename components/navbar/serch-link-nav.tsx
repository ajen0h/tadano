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
    {
      name: `${t('Team')}`,
      href: '/team',
      icon: '',
    },
  ];

  return (
    <main className="h-full flex justify-center items-center gap-5 text-sm pb-4">
      {navLinks.map((link) => (
        <NavigationLink
          key={link.name}
          href={link.href}
          className={` text-lg ${
            link.href === `${pathname}`
              ? 'text-pink-400 border-b-2 border-pink-400 '
              : ''
          }`}>
            <p className='font-semibold hover:text-pink-400 transition-all'>

          {link.name}
            </p>
        </NavigationLink>
      ))}
    </main>
  );
};
