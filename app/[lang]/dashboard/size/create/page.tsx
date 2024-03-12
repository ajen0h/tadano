import {GoBackButton} from '../../_components/goback-button';
import {SizeForm} from '../[sizeId]/_components/size-form';

const CreatePlayerPage = async({params:{lang}}:{params:{lang:string}}) => {
  const dictionary=await import( `@/app/dictionaries/${lang}.json`).then(m=>m.default)
  return (
    <div>
      <GoBackButton href={'/dashboard/size'} title={dictionary.General["Go back"]} />
      <SizeForm initialData={null} />
    </div>
  );
};

export default CreatePlayerPage;
