'use client';

import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {link} from 'fs';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

export const SideBar = () => {
  const pathname = usePathname();

  const linksWeb = [
    {name: 'Match', href: '/dashboard/match'},
    {name: 'New', href: '/dashboard/new'},
    {name: 'Player', href: '/dashboard/player'},
    {name: 'Team', href: '/dashboard/teams'},
  ];

  const linksStore = [
    {name: 'Color', href: '/dashboard/color'},
    {name: 'Category', href: '/dashboard/category'},
    {name: 'Size', href: '/dashboard/size'},
    {name: 'Product', href: '/dashboard/product'},
  ];

  return (
    <aside className="h-full flex flex-col bg-fondo text-white">
      <div className="p-7">
        <h2 className="text-center">ATM</h2>
        <p className="text-[0.75rem] text-center">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
          animi
        </p>
      </div>
      <Separator />
      <div className="grid">
        <p className="p-4 text-[0.75rem] opacity-60">Web</p>
        {linksWeb.map((link) => (
          <Button
            className={`${
              pathname === link.href ? 'bg-pink-400 opacity-100' : 'opacity-60'
            } justify-start rounded-none  `}
            variant={'ghost'}
            key={link.name}
            asChild>
            <Link href={link.href}>{link.name}</Link>
          </Button>
        ))}
      </div>
      
      <div className="grid">
        <p className="p-4 text-[0.75rem] opacity-60">Store</p>
        {linksStore.map((link) => (
          <Button
            className={`${
              pathname === link.href ? 'bg-pink-400 opacity-100' : 'opacity-60'
            } justify-start rounded-none  `}
            variant={'ghost'}
            key={link.name}
            asChild>
            <Link href={link.href}>{link.name}</Link>
          </Button>
        ))}
      </div>
    </aside>
  );
};
