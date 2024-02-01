import {Button} from '@/components/ui/button';
import {SignedIn, SignedOut, UserButton} from '@clerk/nextjs';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      Main Page!
      <SignedOut>
        <Button asChild>
          <Link href={'/sign-in'}>Sign In</Link>
        </Button>
      </SignedOut>
      <SignedIn>
      <UserButton afterSignOutUrl="/"/>
      </SignedIn>
    </main>
  );
}
