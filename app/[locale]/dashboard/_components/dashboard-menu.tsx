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
import { useTranslations } from 'next-intl';

export function DashboardMenu() {
  const t=useTranslations("General")
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const linksWeb = [
    {name: `${t("Match")}`, href: '/dashboard/match'},
    {name: `${t("New")}`, href: '/dashboard/new'},
    {name: `${t("Player")}`, href: '/dashboard/player'},
    {name: `${t("Team")}`, href: '/dashboard/teams'},
    {name: `${t("User")}`, href: '/dashboard/user'},
    {name: `${t("Color")}`, href: '/dashboard/color'},
    {name: `${t("Category")}`, href: '/dashboard/category'},
    {name: `${t("Size")}`, href: '/dashboard/size'},
    {name: `${t("Product")}`, href: '/dashboard/product'},
    {name: `${t("Category Thread")}`, href: '/dashboard/categoryThread'},
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
