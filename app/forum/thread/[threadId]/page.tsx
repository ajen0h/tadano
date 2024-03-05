import {getThread} from '@/actions/thread';
import {ThreadCard} from '../../_components/thread-card';

const ThreadId = async ({params}: {params: {threadId: string}}) => {
  const thread = await getThread(params.threadId);

  return (
    <main className="mt-5 max-w-[1000px] m-[0_auto]">
      <section className="grid grid-cols-1">
        <ThreadCard thread={thread} />
      </section>
    </main>
  );
};

export default ThreadId;
