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
export const ModalLoginRedirect = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button>Add Thread</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Has iniciado sessión?</AlertDialogTitle>
          <AlertDialogDescription>
            Necesitas estar logeado para poder crear un hilo
          </AlertDialogDescription>
          <section className="grid gap-3">
            <Button
              variant={'ghost'}
              className="bg-pink-400 text-white hover:text-white hover:bg-pink-300"
              asChild>
              <NavigationLink href={`/sign-in`}>Sing-in</NavigationLink>
            </Button>
            <Button asChild>
              <NavigationLink href={`/sign-up`}>Sing-up</NavigationLink>
            </Button>
          </section>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
