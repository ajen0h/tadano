import {Button} from '@/components/ui/button';
import NavigationLink from '@/components/navbar/navigation-link';
import Image from 'next/image';
import { NavbarFixtures } from './_components/navbar-fixtures';

const FixturesLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <main>
      <header className="bg-amber-700 h-12">
        <div className="h-full grid grid-cols-2 col-start-2 w-full">
          <Button className="rounded-none h-full">In this section</Button>
        </div>
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <section className="h-full flex flex-col">
          <main className="bg-slate-100 px-6 py-10 h-full">
            <div className="flex flex-row justify-center items-center">
              <p className="font-bold">Last Game</p>
            </div>
            <div className="grid grid-cols-2">
              <div className="flex flex-col justify-center items-center gap-3">
                <div className="h-[70px] w-[70px] relative">
                  <Image
                    src={'/tanjiro.jpg'}
                    alt=""
                    fill
                    className="object-cover rounded-full "
                  />
                </div>
                <p className="text-4xl font-bold">2</p>
              </div>
              <div className="flex flex-col justify-center items-center gap-3">
                <div className="h-[70px] w-[70px] relative">
                  <Image
                    src={'/tanjiro.jpg'}
                    alt=""
                    fill
                    className="object-cover rounded-full "
                  />
                </div>
                <p className="text-4xl font-bold">2</p>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center pt-3">
              <p className="font-semibold ">16th March 2024, 6:30pm</p>
              <p className="opacity-90">EITHNAD STADIUM</p>
            </div>
          </main>
        </section>
        <section className="h-full flex flex-col">
          <main className="px-10 bg-slate-400 py-6 h-full">
            <p className="font-semibold pb-4">Next Game</p>
            <div className="grid grid-cols-[auto_1fr] gap-6">
              <div className="h-[80px] w-[80px] relative">
                <Image
                  src={'/tanjiro.jpg'}
                  alt=""
                  fill
                  className="object-cover rounded-full "
                />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-2xl font-bold break-words">
                    WEST HAM UNITED
                  </p>
                  <p className="font-medium text-xl">at St. james Park</p>
                  <div className="pt-6 opacity-90">
                    <p>30th March 2024, 1:30pm</p>
                    <p>Premier League</p>
                  </div>
                </div>
                <div className="pt-10">
                  <Button>Get Ticket</Button>
                </div>
              </div>
            </div>
          </main>
        </section>
      </main>
      <section>
       <NavbarFixtures/>
      </section>
      <div>{children}</div>
    </main>
  );
};

export default FixturesLayout;
