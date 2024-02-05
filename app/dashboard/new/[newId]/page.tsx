import {getNewById} from '@/actions/news';
import {NewForm} from './_components/new-form';

const NewIdPage = async ({params}: {params: {newId: string}}) => {
  const newById = await getNewById(params.newId);
  return (
    <div>
      <NewForm initialData={newById} />
    </div>
  );
};

export default NewIdPage;
