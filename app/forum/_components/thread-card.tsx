import {Comment, Thread, ThreadVotes, User} from '@prisma/client';
import '@/styles/editor.css';
import {HeartIcon, User2Icon} from 'lucide-react';
import {FormComment} from './form-comment';
import Image from 'next/image';
import {useSession} from 'next-auth/react';
import {CommentCard} from './comment-card';
import {ButtonLike} from './button-like';
import {auth} from '@/auth';
import {getThreadVotedByUserId} from '@/actions/thread';
import {FaRegHeart} from 'react-icons/fa';
import {Button} from '@/components/ui/button';
import Link from 'next/link';

interface ThreadProps {
  thread: Thread & {
    User: User;
    comments: Comment[];
    ThreadVotes: ThreadVotes[];
  };
}
export const ThreadCard = async ({thread}: ThreadProps) => {
  const session = await auth();
  const threadLiked = await getThreadVotedByUserId(thread.id);

  return (
    <section className="border p-5 ">
      <div className="flex flex-col gap-3 mb-5">
        <p className="font-bold text-4xl">{thread.title}</p>
        <p className="opacity-80">{thread.description}</p>
        <div className="flex flex-row justify-start items-center gap-1">
          <User2Icon className="h-4 w-4" />
          <p className="text-sm">{thread.User.name}</p>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{__html: thread.body}} className="editor" />
      <div className="flex flex-row justify-start items-center gap-2 py-5 border-b">
        {session?.user?.id ? (
          <>
            <ButtonLike threadId={thread.id} threadLiked={threadLiked} />
            <p>{thread.ThreadVotes.length}</p>
          </>
        ) : (
          <>
            <Button variant={'ghost'} asChild>
              <Link href={'/sign-in'}>
                <FaRegHeart className="w-5 h-5" />
              </Link>
            </Button>
          </>
        )}
      </div>
      <section className="py-4">
        {session ? (
          <main className="grid md:grid-cols-[auto_1fr] gap-3">
            {session.user?.image ? (
              <>
                <Image
                  src={`${session.user.image}`}
                  alt={`${session.user.name}`}
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
          <p className="text-2xl font-bold">
            Comments {thread.comments.length}
          </p>
          {thread.comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </section>
      </section>
    </section>
  );
};
