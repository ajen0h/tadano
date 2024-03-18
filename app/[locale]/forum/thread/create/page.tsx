import { getCategoryThread } from '@/actions/category';
import {ThreadForm} from '../../_components/thread-form';

const ThreadCreate = async() => {
  const categories=await getCategoryThread()
  return (
    <div>
      <ThreadForm categories={categories}/>
    </div>
  );
};

export default ThreadCreate;
