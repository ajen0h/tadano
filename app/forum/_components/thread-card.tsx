'use client';

import {Comment, Thread, User} from '@prisma/client';
import '@/styles/editor.css';
import {HeartIcon, User2Icon} from 'lucide-react';
import {FormComment} from './form-comment';
import Image from 'next/image';
import {useSession} from 'next-auth/react';
import {CommentCard} from './comment-card';

interface ThreadProps {
  thread: Thread & {
    User: User;
    comments: Comment[];
  };
}
export const ThreadCard = ({thread}: ThreadProps) => {
  const session = useSession();
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
        {session ? (
          <main className="grid md:grid-cols-[auto_1fr] gap-3">
            {session.data?.user?.image ? (
              <>
                <Image
                  src={`${session.data.user.image}`}
                  alt={`${session.data.user.name}`}
                  width={50}
                  height={50}
                  className="hidden md:block rounded-full"
                />
              </>
            ) : (
              <>
                <Image
                  src={`/tanjiro.jpg`}
                  alt={`tanjiro`}
                  width={50}
                  height={50}
                  className="hidden md:block rounded-full"
                />
              </>
            )}
            <FormComment threadId={thread.id} />
          </main>
        ) : null}
        <section className="mt-4">
          <p className="text-2xl font-bold">Comments {thread.comments.length}</p>
          {thread.comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </section>
      </section>
    </section>
  );
};
