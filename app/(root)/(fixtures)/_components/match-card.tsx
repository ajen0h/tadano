import {getTicketByUser} from '@/actions/ticket';
import {PdfDownload} from '@/app/pdf/_components/pdf-generated';
import {Button} from '@/components/ui/button';
import {Card} from '@/components/ui/card';
import {Match, Team} from '@prisma/client';
import {Suspense} from 'react';
import LoadingPage from '../loading';

interface MatchProps {
  match: Match & {
    localTeam: Team;
    visitingTeam: Team;
  };
}

const MatchCard = async ({match}: MatchProps) => {
  const ticketUser = await getTicketByUser(match.id);

  const day = match.date.split(/-|:|T|Z/g)[2];
  const hour = match.date.split(/-|:|T|Z/g)[3];
  const minute = match.date.split(/-|:|T|Z/g)[4];
  const month = match.date.split(/-|:|T|Z/g)[1];
  console.log(day);
  return (
    <Suspense fallback={<LoadingPage />}>
      <section className="border-b p-5">
        <section className="grid grid-cols-3 gap-3 ">
          <div className="flex flex-col justify-center items-center gap-3">
            <div
              className={`bg-center bg-no-repeat bg-cover w-[60px] h-[60px]`}
              style={{
                backgroundImage: `url(${match.localTeam.imageUrl})`,
              }}></div>
            <p className="text-sm font-bold text-center">
              {match.localTeam.name}
            </p>
          </div>

          <div className="grid grid-cols-1 place-content-center text-center">
            <h1 className="font-bold text-sm">{match.league}</h1>
            <p>Thu 07 Mar</p>
            {!match.isFinish ? (
              <>
                <h2 className="font-bold">
                  {hour}:{minute}
                </h2>
              </>
            ) : (
              <>
                <h2 className="font-bold text-2xl">
                  {match.localGoals} - {match.visitingGoals}
                </h2>
              </>
            )}

            <p className="text-[0.8rem]">{match.stadium}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <div
              className={`bg-center bg-no-repeat bg-cover w-[60px] h-[60px]`}
              style={{
                backgroundImage: `url(${match.visitingTeam.imageUrl})`,
              }}></div>

            <p className="text-sm font-bold text-center">
              {match.visitingTeam.name}
            </p>
          </div>
        </section>
        <section>
          <div className="p-4 flex justify-center items-center ">
            {!match.isFinish ? (
              <>
                {!ticketUser ? (
                  <>
                    <Button asChild className='rounded-full'>
                      <PdfDownload date={match.date} matchId={match.id} />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button disabled className='rounded-full'>Match is finish</Button>
                  </>
                )}
              </>
            ) : (
              <>
                <Button disabled className='rounded-full'>Match is finish</Button>
              </>
            )}
          </div>
        </section>
      </section>
    </Suspense>
  );
};

export default MatchCard;
