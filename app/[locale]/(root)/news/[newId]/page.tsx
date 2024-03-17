import {ArrowBigLeft} from 'lucide-react';
import {IndividualPost} from './_components/individual-post';
import {getNewById} from '@/actions/news';
import {notFound} from 'next/navigation';

interface NewIdPageProps {
  params: {newId: string};
}

const NewIdPage = async ({params}: NewIdPageProps) => {
  const report = await getNewById(params.newId);

  return (
    <main>
      {report ? (
        <>
          <IndividualPost key={report.id} report={report} />
        </>
      ) : (
        <>No hay</>
      )}
    </main>
  );
};

export default NewIdPage;
