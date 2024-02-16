import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import {ClerkProvider} from '@clerk/nextjs';
import {QueryProvider} from '@/lib/query-provider';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Hitohito Tadano',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={inter.className}>
          <QueryProvider>{children}</QueryProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
