'use client';

import {Button} from '../ui/button';
import Link from 'next/link';
import {useTranslations} from 'next-intl';
import NavigationLink from './navigation-link';

export const AuthButtons = () => {
  const t = useTranslations('Links');
  return (
    <section className="flex flex-row justify-center items-center gap-3">
      <Button variant={'ghost'} asChild>
        <NavigationLink href={`/sign-in`}>{t('Sign In')}</NavigationLink>
      </Button>
      <Button asChild>
        <NavigationLink href={`/sign-up`}>{t('Sign Up')}</NavigationLink>
      </Button>
    </section>
  );
};
