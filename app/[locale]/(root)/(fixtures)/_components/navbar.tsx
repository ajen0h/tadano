'use client';

import {Link} from '@/navigation'
export const NavbarFixtures = () => {
  return (
    <section className="w-full bg-black text-white">
      <div className="flex flex-row gap-2 p-3">
        <Link href={'/fixtures'}>Fixtures</Link>
      </div>
    </section>
  );
};
