import {getSizeById} from '@/actions/size';
import {SizeForm} from './_components/size-form';
import { GoBackButton } from '../../_components/goback-button';

const SizeIdPage = async ({params}: {params: {sizeId: string,lang:string}}) => {
  const dictionary=await import( `@/app/dictionaries/${params.lang}.json`).then(m=>m.default)
  const size = await getSizeById(params.sizeId);
  return (
    <div>
      <GoBackButton href={'/dashboard/size'} title={dictionary.General["Go back"]} />

      <SizeForm initialData={size} />
    </div>
  );
};

export default SizeIdPage;
