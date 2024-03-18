'use client';

import NavigationLink from '@/components/navbar/navigation-link';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {usePathname} from '@/navigation';

export const SideBar = () => {
  const linksWeb = [
    {name: 'Match', href: '/dashboard/match'},
    {name: 'New', href: '/dashboard/new'},
    {name: 'Player', href: '/dashboard/player'},
    {name: 'Team', href: '/dashboard/teams'},
    {name: 'User', href: '/dashboard/user'},
    {name: 'Color', href: '/dashboard/color'},
    {name: 'Category', href: '/dashboard/category'},
    {name: 'Size', href: '/dashboard/size'},
    {name: 'Product', href: '/dashboard/product'},
    {name: 'Category Thread', href: '/dashboard/categoryThreads'},
  ];



  const pathname = usePathname();
  return (
    <aside className="py-5 h-full flex flex-col bg-fondo text-white overflow-y-auto">
      <div className="grid">
        {linksWeb.map((link) => (
          <Button
            className={`${
              pathname === link.href ? 'bg-pink-400 opacity-100' : 'opacity-60'
            } justify-start rounded-none  `}
            variant={'ghost'}
            key={link.name}>
            <NavigationLink href={`${link.href}`}>{link.name}</NavigationLink>
          </Button>
        ))}
      </div>
    </aside>
  );
};
