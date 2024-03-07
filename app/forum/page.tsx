import {getThreads} from '@/actions/thread';
import {ThreadsCards} from './_components/threads-cards';

import {ButtonCreateThread} from './_components/button-create-thread';
import {auth} from '@/auth';
import {Button} from '@/components/ui/button';
import Link from 'next/link';

const ForumPage = async () => {
  const threads = await getThreads();
  const session = await auth();

  return (
    <main className="container grid lg:grid-cols-[1fr_300px] gap-5 lg:gap-20 mt-16">
      {session?.user?.id ? (
        <>
          <ButtonCreateThread />
        </>
      ) : (
        <>
          <Button asChild className="lg:w-full">
            <Link href={'/sign-in'}>Create Thread</Link>
          </Button>
        </>
      )}

      <div className="grid grid-cols-1 gap-4 lg:row-start-1 ">
        {threads.map((thread) => (
          <ThreadsCards key={thread.id} thread={thread} />
        ))}
      </div>
    </main>
  );
};

export default ForumPage;
