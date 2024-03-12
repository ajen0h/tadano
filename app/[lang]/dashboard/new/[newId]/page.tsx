import {getNewById} from '@/actions/news';
import {NewForm} from './_components/new-form';
import { GoBackButton } from '../../_components/goback-button';

const NewIdPage = async ({params}: {params: {newId: string,lang:string}}) => {
  const dictionary=await import( `@/app/dictionaries/${params.lang}.json`).then(m=>m.default)
  const newById = await getNewById(params.newId);
  return (
    <div>
      <GoBackButton href={"/dashboard/new"} title={dictionary.General["Go back"]}/>
      <NewForm initialData={newById} />
    </div>
  );
};

export default NewIdPage;
