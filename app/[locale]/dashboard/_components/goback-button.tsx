'use client';

import NavigationLink from '@/components/navbar/navigation-link';
import {Button} from '@/components/ui/button';
import {ArrowBigLeftIcon} from 'lucide-react';

interface GoBackButtonProps {
  href: string;
  title: string;
}

export const GoBackButton = ({href, title}: GoBackButtonProps) => {
  return (
    <Button asChild>
      <NavigationLink href={`${href}`}>
        <ArrowBigLeftIcon />
        {title}
      </NavigationLink>
    </Button>
  );
};
