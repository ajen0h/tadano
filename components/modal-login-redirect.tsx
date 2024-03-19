'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {Button} from './ui/button';
import NavigationLink from './navbar/navigation-link';
import { useTranslations } from 'next-intl';
export const ModalLoginRedirect = ({title}:{title:string}) => {
  const t=useTranslations("General")
  
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button>{title}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("Have you logged in?")}</AlertDialogTitle>
          <AlertDialogDescription>
          {t("You need to be logged in to create a thread")}
          </AlertDialogDescription>
          <section className="grid gap-3">
            <Button
              variant={'ghost'}
              className="bg-pink-400 text-white hover:text-white hover:bg-pink-300"
              asChild>
              <NavigationLink href={`/sign-in`}>{t("Sing-in")}</NavigationLink>
            </Button>
            <Button asChild>
              <NavigationLink href={`/sign-up`}>{t("Sing-up")}</NavigationLink>
            </Button>
          </section>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("Cancel")}</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
