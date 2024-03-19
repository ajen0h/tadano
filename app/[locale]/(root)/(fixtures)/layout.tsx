import {Button} from '@/components/ui/button';
import NavigationLink from '@/components/navbar/navigation-link';
import Image from 'next/image';
import {NavbarFixtures} from './_components/navbar-fixtures';

const FixturesLayout = async ({children}: {children: React.ReactNode}) => {

  return (
    <main className=''>


      <NavbarFixtures />
      <div>{children}</div>
    </main>
  );
};

export default FixturesLayout;
