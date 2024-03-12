"use client"
import {useRouter} from 'next/navigation';
import {Button} from '../ui/button';
import {RxExit} from 'react-icons/rx';
import {signOut} from 'next-auth/react';
import { useLang } from '@/hooks/use-lang';

interface LogoutButtonProps {
  setOpen: (value: boolean) => void;
}

export const LogoutButton = ({setOpen}: LogoutButtonProps) => {
  const {lang}=useLang()
  return (
    <>
      <Button
        variant={'ghost'}
        className="justify-start gap-4"
        onClick={() => {
          signOut({
            callbackUrl: `/${lang}`,
          });
          setOpen(false);
        }}>
        <RxExit className="rotate-180" />
        <h3>Sign Out</h3>
      </Button>
    </>
  );
};
