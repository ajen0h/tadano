import {getThreads} from '@/actions/thread';
import {ThreadsCards} from './_components/threads-cards';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import { ButtonCreateThread } from './_components/button-create-thread';

const ForumPage = async () => {
  const threads = await getThreads();
  if (threads.length <= 0) {
    return <>No hay</>;
  }
  return (
    <main className="container grid lg:grid-cols-[1fr_300px] gap-5 lg:gap-20 mt-16">
      <ButtonCreateThread/>
      <div className="grid grid-cols-1 gap-4 lg:row-start-1 ">
        {threads.map((thread) => (
          <ThreadsCards key={thread.id} thread={thread} />
        ))}
      </div>
    </main>
  );
};

export default ForumPage;
