import {getThreads} from '@/actions/thread';
import {ThreadsCards} from './_components/threads-cards';

const ForumPage = async () => {
  const threads = await getThreads();
  return (
    <div>
      {threads.map((thread) => (
        <ThreadsCards key={thread.id} thread={thread} />
      ))}
    </div>
  );
};

export default ForumPage;
