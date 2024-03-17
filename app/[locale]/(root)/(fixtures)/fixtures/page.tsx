import {getMatch, getMatchNotFinished} from '@/actions/match';
import Header from '../_components/header';
import MatchCard from '../_components/match-card';
import {Suspense} from 'react';
import Image from 'next/image';
import {Button} from '@/components/ui/button';
import {SiGooglemaps} from 'react-icons/si';
import {getTranslations} from 'next-intl/server';
import NavigationLink from '@/components/navbar/navigation-link';

const FixturesPage = async () => {
  const t = await getTranslations('Fixtures');
  const matches = await getMatchNotFinished();

  return (
    <main>
      <section className="bg-yellow-900 px-10">
        <header className=" text-white py-6 border-b-white border-b">
          <p className="text-3xl font-bold pb-2 lg:text-4xl">Our Fixtures</p>
          <p className="text-xs font-semibold">
            All times displayed in your local timezone
          </p>
        </header>
        {matches.map((match) => (
          <main
            key={match.id}
            className=" py-6 text-white border-b-white border-b">
            <div className="lg:hidden grid grid-cols-[auto_1fr] gap-6">
              <div className="h-[80px] w-[80px] relative">
                <Image
                  src={`${match.visitingTeam.imageUrl}`}
                  alt=""
                  fill
                  className="object-cover rounded-full "
                />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-2xl font-bold break-words">
                  {`${match.visitingTeam.name}`}
                  </p>
                  <p className="font-medium text-xl">{`${match.stadium}`}</p>
                  <div className="pt-6 opacity-90">
                    <p>30th March 2024, 1:30pm</p>
                    <p>{`${match.league}`}</p>
                  </div>
                </div>
                <div className="pt-10">
                  <Button>Get Ticket</Button>
                </div>
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-[700px_auto_auto] ">
              <div className="grid grid-cols-[auto_1fr] gap-8 border-r border-r-white">
                <div className="h-[80px] w-[80px] relative">
                  <Image
                    src={`${match.visitingTeam.imageUrl}`}
                    alt=""
                    fill
                    className="object-cover rounded-full "
                  />
                </div>

                <div className="flex flex-col justify-center items-start">
                  <p className="text-2xl lg:text-4xl font-bold break-words">
                  {`${match.visitingTeam.name}`}
                  </p>
                  <p className="font-medium text-xl">{`${match.stadium}`}</p>
                </div>
              </div>
              <div className=" opacity-90 border-r border-r-white px-10">
                <p className="text-xl font-semibold">30th March 2024, 1:30pm</p>
                <p className="text-lg">{`${match.league}`}</p>
              </div>

              <div className="flex flex-row justify-center items-center border-r border-r-white px-10">
                <Button className="">Get Ticket</Button>
              </div>
            </div>
          </main>
        ))}
      </section>
    </main>
  );
};

export default FixturesPage;
