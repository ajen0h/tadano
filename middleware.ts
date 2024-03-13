import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import {locales, localePrefix,pathnames} from './navigation';


const intlMiddleware=createMiddleware({
  defaultLocale: 'en',
  localePrefix,
  locales,
  pathnames
});

export default function(req:NextRequest):NextResponse{
  return intlMiddleware(req)
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(es|en)/:path*']
};


/* import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'es'],
 
  // Used when no locale matches
  defaultLocale: 'en'
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(es|en)/:path*']
}; */