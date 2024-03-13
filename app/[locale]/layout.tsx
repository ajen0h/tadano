import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import {QueryProvider} from '@/lib/query-provider';
import {NavBar} from '@/components/navbar/navbar';
import {auth} from '@/auth';
import {SessionProvider} from 'next-auth/react';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import ProvidSessionClientProvider from '@/lib/SessionClientProvider';
const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Hitohito Tadano',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
  params: {lang, locale},
}: Readonly<{
  children: React.ReactNode;
  params: {lang: string; locale: string};
}>) {

  const message=useMessages()

  return (
    <ProvidSessionClientProvider>
      <html lang={locale}>
        
          <NextIntlClientProvider messages={message}>
            <body className={inter.className}>
              <NavBar />
              <QueryProvider>{children}</QueryProvider>
            </body>
          </NextIntlClientProvider>
        
      </html>
    </ProvidSessionClientProvider>
  );
}
