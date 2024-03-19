'use client';

import NavigationLink from '@/components/navbar/navigation-link';
import {Button} from '@/components/ui/button';
import {usePathname} from '@/navigation';

export const NavbarFixtures = () => {
  const pathname = usePathname();
  console.log(pathname);

  const navLinks = [
    {name: 'Fixtures', href: '/fixtures'},
    {name: 'Results', href: '/result'},
  ];

  return (
    <main className="bg-black text-white flex flex-row">
      <div className='px-10 xl:container'>

      {navLinks.map((nav) => (
        <Button
        key={nav.href}
        className={` rounded-none h-full p-4 border-r border-r-white font-bold uppercase ${
            pathname === nav.href ? 'bg-pink-400 text-white' : ''
          }`}
          asChild>
          <NavigationLink href={`${nav.href}`}>
            <p className={`font-bold px-10`}>{nav.name}</p>
          </NavigationLink>
        </Button>
      ))}
      </div>
    </main>
  );
};
