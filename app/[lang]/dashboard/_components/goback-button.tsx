'use client';

import {Button} from '@/components/ui/button';
import {ArrowBigLeftIcon} from 'lucide-react';
import Link from 'next/link';

interface GoBackButtonProps {
  href: string;
  title: string;
}

export const GoBackButton = ({href, title}: GoBackButtonProps) => {
  return (
    <Button asChild>
      <Link href={`${href}`}>
        <ArrowBigLeftIcon />
        {title}
      </Link>
    </Button>
  );
};
