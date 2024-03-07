'use client';

import {useRouter} from 'next/navigation';
import {Button} from '../ui/button';

export const AuthButtons = () => {
  const router = useRouter();
  return (
    <section className="flex flex-row justify-center items-center gap-3">
      <Button variant={'ghost'} onClick={() => router.push('/sign-in')}>
        Sign In
      </Button>
      <Button onClick={() => router.push('/sign-up')}>Sign Up</Button>
    </section>
  );
};
