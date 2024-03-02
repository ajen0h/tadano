'use client';

import {Button} from '@/components/ui/button';
import Link from 'next/link';

export const ButtonCreateThread = () => {
  return (
    <div className="flex flex-row justify-end items-center md:items-start lg:col-start-2 lg:col-end-3 ">
      <Button asChild className="lg:w-full">
        <Link href={'/forum/thread/create'}>Create Thread</Link>
      </Button>
    </div>
  );
};
