'use client';

import NavigationLink from '@/components/navbar/navigation-link';
import {Thread, User} from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

interface ThreadProps {
  thread: Thread & {
    User: User;
  };
}
export const ThreadsCards = ({thread}: ThreadProps) => {
  return (
    <>
      <NavigationLink href={`/forum/thread/${thread.id}`} className='cursor-pointer hover:scale-105 transition-all'>
        <main className="grid grid-cols-[auto_1fr] gap-5 p-4 border rounded-xl shadow-lg">
          <div className="">
            {/* <Image
              src={`${thread.User.image_url}`}
              alt={`${thread.User.username}`}
              width={40}
              height={40}
              className="rounded-full"
            /> */}
          </div>
          <div className="flex flex-col justify-start items-start">
            <p className="font-bold lg:text-lg xl:text-xl 2xl:text-2xl">{thread.title}</p>
            <p className="text-[0.9rem] xl:text-lg opacity-80">{thread.description}</p>
          </div>
        </main>
      </NavigationLink>
      
    </>
  );
};
