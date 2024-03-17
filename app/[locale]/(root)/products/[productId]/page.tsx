import {Button} from '@/components/ui/button';
import Image from 'next/image';

const ProductIdPage = ({
  params: {productId},
}: {
  params: {productId: string};
}) => {
  return (
    <main>
      <section className='xl:container py-10 px-10 grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div className="relative h-[400px] md:h-[500px] lg:h-[700px]">
          <Image src={'/tanjiro.jpg'} alt="" fill className="object-cover" />
        </div>
        <div className='flex flex-col'>
          <p className='font-bold text-3xl break-words  md:text-5xl lg:text-7xl'>Linen Cusfhion Cover</p>
          <p className='font-semibold text-xl md:pt-5 md:text-2xl lg:text-4xl'>$19</p>
          <p className='opacity-90 break-words md:pt-5 lg:text-4xl md:text-2xl'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
            explicabo eius asperiores quaerat voluptatum. Laborum eum voluptates
            dolorem molestiae aspernatur!
          </p>
          <div className='h-full flex flex-row justify-center items-center md:justify-between md:items-end pt-4'>
            <Button className='w-full lg:text-lg'>Add Card</Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductIdPage;
