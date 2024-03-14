import {Button} from '@/components/ui/button';
import {Link} from '@/navigation'
import {FaArrowRight} from 'react-icons/fa';


const Hero = () => {
 

  return (
    <section className="h-[100vh] bg-hero bg-cover bg-center bg-no-repeat ">
      <div className="h-full text-white flex flex-col justify-start items-start w-1/2 gap-5 pl-28 pt-28 ">
        <div>
          <h1 className="text-7xl font-bold mb-3 uppercase lg:text-9xl">Atlético barril</h1>
          <p className="text-lg lg:xl: text-white/60">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit ea
            harum saepe fuga eligendi culpa alias, quibusdam ad, possimus
            similique quis expedita rem quo ut. Dolor qui voluptatem recusandae
            accusantium!
          </p>
        </div>

        <div className='w-[50%] grid'>
          <Button variant={'border'} size={'lg'} className="">
            <Link
              href={'/'}
              className="flex flex-row justify-center items-center gap-2">
              <FaArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
