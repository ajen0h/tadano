import {getMatchFinished} from '@/actions/match';
import {Button} from '@/components/ui/button';
import Image from 'next/image';

const ResultPage = async () => {
  const matches = await getMatchFinished();
  return (
    <main>
      <section className="bg-yellow-900 px-10">
        <header className=" text-white py-6 border-b-white border-b">
          <p className="text-3xl font-bold pb-2 lg:text-4xl">Our Results</p>
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
                    {`${match.localGoals}`} {`${match.localTeam.name}`}
                  </p>
                  <p className="text-2xl font-bold break-words opacity-50">
                    {`${match.visitingGoals}`} {`${match.visitingTeam.name}`}
                  </p>

                  <div className="pt-6 opacity-90">
                    <p>30th March 2024, 1:30pm</p>
                    <p>{`${match.league}`}</p>
                  </div>
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
                  <p className="text-2xl font-bold break-words">
                    {`${match.localGoals}`} {`${match.localTeam.name}`}
                  </p>
                  <p className="text-2xl font-bold break-words opacity-50">
                    {`${match.visitingGoals}`} {`${match.visitingTeam.name}`}
                  </p>
                </div>
              </div>
              <div className=" opacity-90 border-r border-r-white px-10">
                <p className="text-xl font-semibold">30th March 2024, 1:30pm</p>
                <p className="text-lg">{`${match.league}`}</p>
              </div>
            </div>
          </main>
        ))}
      </section>
    </main>
  );
};

export default ResultPage;
