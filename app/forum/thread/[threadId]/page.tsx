import {getThread} from '@/actions/thread';
import {ThreadCard} from '../../_components/thread-card';

const ThreadId = async ({params}: {params: {threadId: string}}) => {
  const thread = await getThread(params.threadId);
  
  return (
    <main className='mt-16 container'>
      <ThreadCard thread={thread} />
    </main>
  );
};

export default ThreadId;
