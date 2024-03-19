import { getColorById } from '@/actions/color';
import {ColorForm} from '../_components/color-form';
import { GoBackButton } from '../../_components/goback-button';
import { getTranslations } from 'next-intl/server';

const ColorIdPage = async ({params}: {params: {colorId: string,lang:string}}) => {
  const t = await getTranslations('Dashboard');
  const color = await getColorById(params.colorId);
  return (
    <>
     <main className='px-10 py-6'>

      <div className='pb-5'>

      <GoBackButton href={"/dashboard/color"} title={t('Color.Go Back')}/>
      </div>
      <ColorForm initialData={color} />
     </main>
      
    </>
  );
};

export default ColorIdPage;
