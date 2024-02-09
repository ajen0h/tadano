import {getNewById} from '@/actions/news';

interface NewIdPageProps {
  params: {newId: string};
}

const NewIdPage = async ({params}: NewIdPageProps) => {
  const report = await getNewById(params.newId);
  return (
    <div>
      <h2>{report?.title}</h2>
      <p>{report?.body}</p>
    </div>
  );
};

export default NewIdPage;
