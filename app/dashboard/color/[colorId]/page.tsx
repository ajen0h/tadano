import { getColorById } from '@/actions/color';
import {ColorForm} from '../_components/color-form';

const ColorIdPage = async ({params}: {params: {colorId: string}}) => {
  const color = await getColorById(params.colorId);
  return (
    <>
      <ColorForm initialData={color} />
    </>
  );
};

export default ColorIdPage;
