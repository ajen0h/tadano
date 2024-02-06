'use client';
import {Button} from '@/components/ui/button';
import {Menu} from 'lucide-react';
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
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import { useState } from 'react';

export function DashboardMenu() {
    const [open, setOpen] = useState(false)
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
      
          <Menu className='cursor-pointer'/>
        
      </SheetTrigger>
      <SheetContent side={"left"}>
        <aside className="h-full flex flex-col ">
          <div className="grid">
            <p className="p-4 text-[0.75rem] opacity-60">Web</p>
            {linksWeb.map((link) => (
              <Button
                className={`${
                  pathname === link.href
                    ? 'bg-pink-400 opacity-100'
                    : 'opacity-60'
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
                  pathname === link.href
                    ? 'bg-pink-400 opacity-100'
                    : 'opacity-60'
                } justify-start rounded-none  `}
                variant={'ghost'}
                key={link.name}
                asChild>
                <Link href={link.href}>{link.name}</Link>
              </Button>
            ))}
          </div>
        </aside>
      </SheetContent>
    </Sheet>
  );
}
