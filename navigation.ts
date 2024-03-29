import {
    createLocalizedPathnamesNavigation,
    Pathnames
  } from 'next-intl/navigation';
   
  export const locales = ['en', 'es'] as const;
  export const localePrefix = 'always'; 
   

  export const pathnames = {

    '/': '/',
    '/blog': '/blog',
    '/news': '/news',
    "/fixtures":"/fixtures",
    "/store":"/store",
    "/forum":"/forum",
    "/sign-in":"/sign-in",
    "/sign-up":"/sign-up",
    '/profile':'/profile',
    "/dashboard/color":"/dashboard/color"
   
   
  

  } satisfies Pathnames<typeof locales>;
   
  export const {Link, redirect, usePathname, useRouter, getPathname} =
    createLocalizedPathnamesNavigation({locales, localePrefix, pathnames});