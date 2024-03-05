import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import {ClerkProvider} from '@clerk/nextjs';
import {QueryProvider} from '@/lib/query-provider';
import {NavBar} from '@/components/navbar/navbar';
import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Hitohito Tadano',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 

  return (
      <ClerkProvider>
        <html lang="es">
          <body className={inter.className} suppressHydrationWarning={true}>
            <NavBar />
            <QueryProvider>{children}</QueryProvider>
          </body>
        </html>
      </ClerkProvider>
  );
}
