'use client';

import {Thread, User} from '@prisma/client';
import '../styles.css';
import { User2Icon } from 'lucide-react';

interface ThreadProps {
  thread: Thread & {
    User: User;
  };
}
export const ThreadCard = ({thread}: any) => {
  return (
    <section>
      <div className='flex flex-col gap-4'>
      <p className='font-bold text-4xl'>{thread.title}</p>

      <p>{thread.description}</p>
      <div className='flex flex-row justify-start items-center gap-2'>
        <User2Icon/>
        <p>{thread.User.username}</p>
      </div>
      </div>
      <div dangerouslySetInnerHTML={{__html: thread.body}} className="editor" />

    </section>
  );
};
