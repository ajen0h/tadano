'use client';

import NavigationLink from '@/components/navbar/navigation-link';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {usePathname} from '@/navigation';
import { useTranslations } from 'next-intl';


export const SideBar = () => {
  const t=useTranslations("General")
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



  const pathname = usePathname();
  const path=`${"/"+pathname.split("/")[1]+"/"+pathname.split("/")[2]}`
  console.log( ` aa${"/"+pathname.split("/")[1]+"/"+pathname.split("/")[2]}` );
  console.log(path,">>>>");
  return (
    <aside className="py-5 h-full flex flex-col bg-fondo text-white overflow-y-auto">
      <div className="grid">
        {linksWeb.map((link) => (
          <Button
            className={`${
              path === link.href ? 'bg-pink-400 opacity-100' : 'opacity-60'
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
