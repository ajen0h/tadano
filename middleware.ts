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


