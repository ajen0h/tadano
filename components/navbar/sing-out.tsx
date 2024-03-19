"use client"
import {useRouter} from 'next/navigation';
import {Button} from '../ui/button';
import {RxExit} from 'react-icons/rx';
import {signOut} from 'next-auth/react';
import { useTranslations } from 'next-intl';

interface LogoutButtonProps {
  setOpen: (value: boolean) => void;
}

export const LogoutButton = ({setOpen}: LogoutButtonProps) => {
  const t=useTranslations("General")
  return (
    <>
      <Button
        variant={'ghost'}
        className="justify-start gap-4 w-full"
        onClick={() => {
          signOut({
            callbackUrl: `/`,
          });
          setOpen(false);
        }}>
        <RxExit className="rotate-180" />
        <h3> {t("Sign Out")}</h3>
      </Button>
    </>
  );
};
