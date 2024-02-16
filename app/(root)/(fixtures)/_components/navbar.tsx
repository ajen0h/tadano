'use client';

import Link from 'next/link';

export const NavbarFixtures = () => {
  return (
    <section className="w-full bg-black text-white">
      <div className="flex flex-row gap-2 p-3">
        <Link href={'/fixtures'}>Fixtures</Link>
        <Link href={'/result'}>Result</Link>
      </div>
    </section>
  );
};
