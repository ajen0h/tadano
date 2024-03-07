'use client';

import {Button} from '../ui/button';

export const Footer = () => {
  return (
    <section className="bg-black text-white p-8 rounded-t-2xl flex flex-col justify-end items-center">
      <div className="flex flex-col justify-center items-center gap-3">
        <h2 className="text-xl font-bold lg:text-2xl">
          Lets get started on something great
        </h2>
        <p className="text-sm">
          Join over 4,000+ startups already growing with Untitled.
        </p>
        <div className="flex flex-row justify-center items-center gap-2 py-4">
          <Button variant={'border'}>Chat to us</Button>
          <Button variant={'border'}>Get started</Button>
        </div>
      </div>
    </section>
  );
};
