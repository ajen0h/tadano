import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {FaArrowRight} from 'react-icons/fa';


const Hero = () => {
 

  return (
    <section className="h-[100vh] bg-hero bg-cover bg-center bg-no-repeat">
      <div className="container h-full text-white text-center flex flex-col md:flex-row justify-center items-center md:items-center md:justify-center gap-4">
        <div>
          <h1 className="text-5xl font-bold mb-3 ">ATLETICO BARRIL</h1>
          <p className="text-sm text-white/60">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit ea
            harum saepe fuga eligendi culpa alias, quibusdam ad, possimus
            similique quis expedita rem quo ut. Dolor qui voluptatem recusandae
            accusantium!
          </p>
        </div>

        <div>
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
