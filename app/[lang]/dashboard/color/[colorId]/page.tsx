import { getColorById } from '@/actions/color';
import {ColorForm} from '../_components/color-form';
import { GoBackButton } from '../../_components/goback-button';

const ColorIdPage = async ({params}: {params: {colorId: string,lang:string}}) => {
  const dictionary=await import( `@/app/dictionaries/${params.lang}.json`).then(m=>m.default)
  const color = await getColorById(params.colorId);
  return (
    <>
      <GoBackButton href={"/dashboard/color"} title={dictionary.General["Go back"]}/>
      <ColorForm initialData={color} />
      
    </>
  );
};

export default ColorIdPage;
