'use client';

import {User2Icon} from 'lucide-react';
import Image from 'next/image';

export const Banner2 = () => {
  return (
    <section>
      <header className="grid gap-4 mb-14">
        <p className="lg:text-lg">News and Updates</p>
        <p className="text-2xl lg:text-4xl font-bold">
          Follow whats brand new in digital design
        </p>
        <p className="lg:text-lg">
          Dont miss the <strong>latest</strong> happenings on{' '}
          <strong>awwwrds</strong>
        </p>
      </header>
      <p className="mb-5 lg:text-lg">
        <strong>w.news</strong>
      </p>
     
    </section>
  );
};
