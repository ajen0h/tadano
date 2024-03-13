import { auth } from '@/auth';
import Hero from '../(root)/_components/hero';
import Match from '../(root)/_components/match';
export default async function Home() {
  const session=await auth()
  
  return (
    <>
    {JSON.stringify({session})}
      <Hero />
      <Match />
    </>
  );
}
