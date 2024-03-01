import {getThread} from '@/actions/thread';
import {ThreadCard} from '../../_components/thread-card';

const ThreadId = async ({params}: {params: {threadId: string}}) => {
  const thread = await getThread(params.threadId);
  
  return (
    <>
      <ThreadCard thread={thread} />
    </>
  );
};

export default ThreadId;
