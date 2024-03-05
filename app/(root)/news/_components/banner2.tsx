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
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Carta */}
        <article className="border p-6 hover:cursor-pointer hover:shadow-xl">
          <div className="h-[500px] relative">
            <Image src={'/tanjiro.jpg'} alt="" fill className="object-cover" />
          </div>
          <div className="flex flex-col gap-2 py-5">
            <p className="text-lg font-bold lg:text-2xl">Kamado Tanjiro</p>
            <p className="opacity-90 lg:text-lg">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae,
              eligendi.
            </p>
          </div>
          <div className="flex flex-row justify-between items-center gap-3">
            <div className="flex flex-row gap-3">
              <User2Icon />
              <p>Tanjiro</p>
            </div>
            <div>
              <p className='text-sm'>5 Marzo de 2024</p>
            </div>
          </div>
        </article>
      </main>
    </section>
  );
};
