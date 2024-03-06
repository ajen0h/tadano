'use client';

import {Thread, User} from '@prisma/client';
import '../styles.css';
import {HeartIcon, User2Icon} from 'lucide-react';
import {FormComment} from './form-comment';
import Image from 'next/image';

interface ThreadProps {
  thread: Thread & {
    User: User;
  };
}
export const ThreadCard = ({thread}: any) => {
  
  return (
    <section className="border p-5 ">
      <div className="flex flex-col gap-3 mb-5">
        <p className="font-bold text-4xl">{thread.title}</p>
        <p className="opacity-80">{thread.description}</p>
        <div className="flex flex-row justify-start items-center gap-1">
          <User2Icon className="h-4 w-4" />
          {/* <p className="text-sm">{thread.User.}</p> */}
        </div>
      </div>
      <div dangerouslySetInnerHTML={{__html: thread.body}} className="editor" />
      <div className="flex flex-row justify-start items-center gap-2 py-5 border-b">
        <HeartIcon />
        <p>4 Likes</p>
      </div>
      <section className="py-4">
        {/* {session ? (
          <main className='grid md:grid-cols-[auto_1fr] gap-3'>
            <Image
              src={`${session.user.imageUrl}`}
              alt={`${session.user.username}`}
              width={50}
              height={50}
              className='hidden md:block rounded-full'
            />
            <FormComment reportId={thread.id} />
          </main>
        ) : (
          <>No existe</>
        )} */}
      </section>
    </section>
  );
};
