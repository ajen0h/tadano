'use client';

import {FaGoogle} from 'react-icons/fa';
import {Button} from './ui/button';
import {signIn} from 'next-auth/react';
import {useLang} from '@/hooks/use-lang';

export const ButtonGoogle = ({pathname}: {pathname: string}) => {
  const {lang, path} = useLang();

  return (
    <Button
      variant={'outline'}
      className="w-full flex flex-row justify-center items-center gap-3"
      onClick={() => {
        signIn('google', {
          callbackUrl: `/${lang}${pathname}`,
        });
      }}>
      <FaGoogle /> Google
    </Button>
  );
};
