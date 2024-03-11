'use client';

import {FaGoogle} from 'react-icons/fa';
import {Button} from './ui/button';
import {signIn} from 'next-auth/react';

export const ButtonGoogle = ({pathname}:{pathname:string}) => {
  return (
    <Button
      variant={'outline'}
      className="w-full flex flex-row justify-center items-center gap-3"
      onClick={() => {
        signIn('google', {
          callbackUrl: `${pathname}`,
        });
      }}>
      <FaGoogle /> Google
    </Button>
  );
};
