'use client';

import NavigationLink from '@/components/navbar/navigation-link';
import {Button} from '@/components/ui/button';

export const SideBar = () => {
  const links = [
    {name: 'User Info', href: '/profile/user-info'},
    {name: 'Favorities', href: '/profile/favorities'},
    {name: 'Settings', href: '/profile/settings'},
  ];

  return (
    <aside >
      <div className="flex flex-col ">
        <div className="py-9 px-14 font-bold text-lg">
          <p>User Profile</p>
        </div>
        <div className="grid">
          {links.map((link) => (
            <Button variant={'ghost'} key={link.name} className="font-semibold">
              <NavigationLink href={link.href}>{link.name}</NavigationLink>
            </Button>
          ))}
        </div>
      </div>
    </aside>
  );
};
