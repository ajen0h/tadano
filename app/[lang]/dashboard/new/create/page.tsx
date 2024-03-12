import {GoBackButton} from '../../_components/goback-button';
import {NewForm} from '../[newId]/_components/new-form';

const CreateNewPage = async({params:{lang}}:{params:{lang:string}}) => {
  const dictionary=await import( `@/app/dictionaries/${lang}.json`).then(m=>m.default)
  return (
    <>
      <GoBackButton href={'/dashboard/new'} title={dictionary.General["Go back"]} />

      <NewForm initialData={null} />
    </>
  );
};

export default CreateNewPage;
