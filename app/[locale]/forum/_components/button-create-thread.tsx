'use client';

import NavigationLink from '@/components/navbar/navigation-link';
import {Button} from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export const ButtonCreateThread = () => {
  const t = useTranslations('Dashboard.Forum');

  return (
    <div className="flex flex-row justify-end items-center md:items-start lg:col-start-2 lg:col-end-3 ">
      <Button asChild className="lg:w-full">
        <NavigationLink href={'/forum/thread/create'}>{t('Create Thread')}</NavigationLink>
      </Button>
    </div>
  );
};
