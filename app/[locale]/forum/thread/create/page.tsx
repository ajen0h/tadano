import { getCategoryThread } from '@/actions/category';
import {ThreadForm} from '../../_components/thread-form';
import { getTranslations } from 'next-intl/server';

const ThreadCreate = async() => {
  const categories=await getCategoryThread()
  const t=await getTranslations("General")
  return (
    <div className='px-10 xl:container py8'>
      <p className='py-6 text-4xl font-bold'>{t("Create new thread")}</p>
      <ThreadForm categories={categories}/>
    </div>
  );
};

export default ThreadCreate;
