import {getSizeById} from '@/actions/size';
import {SizeForm} from './_components/size-form';

const SizeIdPage = async ({params}: {params: {sizeId: string}}) => {
  const size = await getSizeById(params.sizeId);
  return (
    <div>
      <SizeForm initialData={size} />
    </div>
  );
};

export default SizeIdPage;
