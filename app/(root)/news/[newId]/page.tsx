import {ArrowBigLeft} from 'lucide-react';
import { IndividualPost } from './_components/individual-post';

interface NewIdPageProps {
  params: {newId: string};
}

const NewIdPage = async ({params}: NewIdPageProps) => {
  return (
    <main >
      
      <IndividualPost/>
    </main>
  );
};

export default NewIdPage;
