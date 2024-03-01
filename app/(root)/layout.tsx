import { Footer } from '@/components/footer/footer';
import {NavBar} from '@/components/navbar/navbar';
import {Separator} from '@/components/ui/separator';

const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='h-full'>
      {/* <NavBar /> */}
      {children}
     {/*  <Footer/> */}
    </div>
  );
};

export default RootLayout;
