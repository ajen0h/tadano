'use client';
import {Button} from '@/components/ui/button';
import {GripHorizontal, Menu} from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {Separator} from '@radix-ui/react-separator';
import {usePathname} from 'next/navigation';
import {useState} from 'react';
import NavigationLink from '@/components/navbar/navigation-link';

export function DashboardMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
    {name: 'Category Thread', href: '/dashboard/categoryThread'},
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          
          className="flex flex-row justify-center items-center gap-3 bg-pink-400">
          <p>Abrir menu </p>
          <GripHorizontal className="cursor-pointer" />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'}>
        <aside className="h-full flex flex-col ">
          <div className="grid py-6">
            {linksWeb.map((link) => (
              <Button
                className={`${
                  pathname === link.href
                    ? 'bg-pink-400 opacity-100'
                    : 'opacity-60'
                } justify-start rounded-none  `}
                variant={'ghost'}
                key={link.name}
                onClick={() => setOpen(false)}>
                <NavigationLink href={link.href}>{link.name}</NavigationLink>
              </Button>
            ))}
          </div>
        </aside>
      </SheetContent>
    </Sheet>
  );
}
