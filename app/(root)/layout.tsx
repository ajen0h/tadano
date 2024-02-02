import {NavBar} from '@/components/navbar/navbar';
import {Separator} from '@/components/ui/separator';

const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="container">
      <NavBar />
      <Separator />
      {children}
    </div>
  );
};

export default RootLayout;
