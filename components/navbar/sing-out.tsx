import {useRouter} from 'next/navigation';
import {Button} from '../ui/button';
import {RxExit} from 'react-icons/rx';
import {useClerk} from '@clerk/nextjs';

interface LogoutButtonProps {
  setOpen: (value: boolean) => void;
}

export const LogoutButton = ({setOpen}: LogoutButtonProps) => {
  const {signOut} = useClerk();
  const router = useRouter();

  return (
    // Clicking on this button will sign out a user and reroute them to the "/" (home) page.
    <Button
      variant={'ghost'}
      className="justify-start gap-4"
      onClick={() => {
        signOut(() => router.push('/'));
        setOpen(false)
      }}>
      <RxExit className="rotate-180" />
      <h3>Sign Out</h3>
    </Button>
  );
};
