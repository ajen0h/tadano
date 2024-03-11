'use client';

import {usePathname, useRouter} from 'next/navigation';
import {Button} from '../ui/button';
import Link from 'next/link';
import {useLang} from '@/hooks/use-lang';

export const AuthButtons = () => {
  const {lang}=useLang()

  return (
    <section className="flex flex-row justify-center items-center gap-3">
      <Button variant={'ghost'} asChild>
        <Link href={`/${lang}/sign-in`}>Sign In</Link>
      </Button>
      <Button asChild>
        <Link href={`/${lang}/sign-up`}>Sign Up</Link>
      </Button>
    </section>
  );
};
