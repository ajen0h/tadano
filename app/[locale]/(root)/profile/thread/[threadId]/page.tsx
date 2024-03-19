import { getThread } from "@/actions/thread";
import { ThreadEdit } from "../../_components/thread-edit";
import { getCategoryThread } from "@/actions/category";

const ThreadIdPage = async ({params: {threadId}}: {params: {threadId: string}}) => {
    const thread = await getThread(threadId);
  const categories=await getCategoryThread()

      return <div>
<ThreadEdit initialValues={thread} categories={categories}/>

      </div>;
};

export default ThreadIdPage;
