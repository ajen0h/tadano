import {getMatchFinished} from '@/actions/match';
import { FechaThread } from '@/app/[locale]/forum/_components/fecha-thread';
import {Button} from '@/components/ui/button';
import { Calendar, MapPin } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

const ResultPage = async () => {
  const t = await getTranslations('General');

  const matches = await getMatchFinished();
  return (
    <main>
    <section className="px-10 xl:container">
      <header className="  py-6 border-b-pink-400 border-b">
        <p className="text-3xl font-bold pb-2 lg:text-5xl">{t("Results")}</p>
        <p>{t("Last club matches")}</p>
      
      </header>
      {/* Respeta lo de los botones */}
      {/* {matches.map((match) => (
        <MatchCardFixtures key={match.id} match={match} />
      ))} */}

      <section className='pt-6'>
      <main className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {matches.map((matchfi) => (
            <article
              key={matchfi.id}
              className="bg-gray-100 rounded-xl px-4 py-6">
              <div>
                <p className="text-end font-bold">{matchfi.league}</p>
              </div>
              <div className="flex flex-row justify-start items-center gap-3 px-5">
                <div className="relative h-[60px] w-[60px]">
                  <Image
                    src={`${matchfi.localTeam.imageUrl}`}
                    alt="elyoya"
                    fill
                    className="object-cover  rounded-full "
                  />
                </div>
                <p className="font-bold">VS</p>
                <div className="relative h-[60px] w-[60px]">
                  <Image
                    src={`${matchfi.visitingTeam.imageUrl}`}
                    alt="elyoya"
                    fill
                    className="object-cover  rounded-full "
                  />
                </div>
              </div>
              <div className="px-5 pt-4">
                <div className="flex flex-row justify-between items-center">
                  <p className="text-lg">{matchfi.localTeam.name}</p>
                  <p className="text-lg">{matchfi.localGoals}</p>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <p className="text-lg">{matchfi.visitingTeam.name}</p>
                  <p className="text-lg">{matchfi.visitingGoals}</p>
                </div>
              </div>
              <div className="px-5 pt-3">
                <p className="flex flex-row items-center justify-start gap-2  opacity-70 text-sm">
                  <Calendar className="opacity-70" />
                  <FechaThread createdAt={matchfi.createdAt} />
                </p>
              </div>
              <div className="px-5 pt-3">
                <p className="flex flex-row items-center justify-start gap-2  opacity-70 text-sm">
                  <MapPin className="opacity-70" />
                  {matchfi.stadium}
                </p>
              </div>
            </article>
          ))}
      </main>
      </section>

    </section>
  </main>
  );
};

export default ResultPage;
