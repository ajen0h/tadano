import {getTicketByUser} from '@/actions/ticket';
import {PdfDownload} from '@/app/pdf/_components/pdf-generated';
import {Button} from '@/components/ui/button';
import {Card} from '@/components/ui/card';
import {Match, Team} from '@prisma/client';
import Header from '../_components/header';
import {Suspense} from 'react';
import Image from 'next/image';
import {SiGooglemaps} from 'react-icons/si';
import {auth} from '@/auth';
import Link from 'next/link';

interface MatchProps {
  match: Match & {
    localTeam: Team;
    visitingTeam: Team;
  };
}

const MatchCard = async ({match}: MatchProps) => {
  const ticketUser = await getTicketByUser(match.id);

  const hour = match.date.split(/-|:|T|Z/g)[3];
  const minute = match.date.split(/-|:|T|Z/g)[4];
  const fechaPersonalizada = new Date(match.date);
  const meses = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ];
  const año = fechaPersonalizada.getFullYear();
  const mesIndex = fechaPersonalizada.getMonth();
  const mesNombre = meses[mesIndex];
  const dia = fechaPersonalizada.getDate();
  const fecha = `${dia} de ${mesNombre} de ${año}`;
  const session = await auth();
  const Goles = () => {
    if (match.localGoals > match.visitingGoals) {
      return (
        <>
          <Button disabled={true} className="disabled:opacity-100">
            {match.localGoals}
          </Button>
          <Button disabled={true}>{match.visitingGoals}</Button>
        </>
      );
    }

    if (match.localGoals < match.visitingGoals) {
      return (
        <>
          <Button disabled={true}>{match.localGoals}</Button>
          <Button disabled={true} className="disabled:opacity-100">
            {match.visitingGoals}
          </Button>
        </>
      );
    }

    return (
      <>
        <Button disabled={true} className="disabled:opacity-100">
          {match.localGoals}
        </Button>
        <Button disabled={true} className="disabled:opacity-100">
          {match.visitingGoals}
        </Button>
      </>
    );
  };

  return (
    <section className="border-b p-5">
      <section className="px-4 lg:px-10 py-6 bg-gray-200">
        <p className="uppercase font-semibold mb-3 lg:text-xl">Julio 23</p>
        {/* Card partido */}
        <main className="grid xl:grid-cols-2 gap-3">
          <article className="border bg-gray-300 p-4">
            <header className="flex flex-col justify-center items-center gap-2 mb-2">
              <p className="text-sm font-bold lg:text-[1rem]">{fecha}</p>
              <p className="text-sm opacity-50 font-bold lg:text-[1rem]">
                {match.league}
              </p>
            </header>
            <main className="grid grid-cols-[1fr_auto_1fr] gap-5 mb-2">
              {/* Equipo 1 */}
              <div className="flex flex-row items-center justify-end gap-3">
                <p className="font-bold lg:text-lg">{match.localTeam.name}</p>
                <div className="relative h-[40px]  w-[40px] md:h-[70px] md:w-[70px] lg:h-[80px] lg:w-[80px]">
                  <Image
                    src={`${match.localTeam.imageUrl}`}
                    fill
                    className="object-cover rounded-full"
                    alt=""
                  />
                </div>
              </div>

              <div className="flex flex-row items-center gap-2">
                <Goles />
              </div>
              {/* Equipo 2 */}

              <div className="flex flex-row items-center gap-3">
                <div className="relative h-[40px]  w-[40px] md:h-[70px] md:w-[70px] lg:h-[80px] lg:w-[80px]">
                  <Image
                    src={`${match.visitingTeam.imageUrl}`}
                    fill
                    className="rounded-full"
                    alt=""
                  />
                </div>
                <p className="font-bold lg:text-lg">
                  {match.visitingTeam.name}
                </p>
              </div>
            </main>
            <div className="hidden md:flex flex-row justify-center items-center opacity-50 font-bold gap-1">
              <SiGooglemaps />
              <p>{match.stadium}</p>
            </div>
            <div className="mt-4">
              {!match.isFinish ? (
                <>
                  {session?.user?.id ? (
                    <>
                      {!ticketUser ? (
                        <>
                          <Button asChild className="rounded-full w-full">
                            <PdfDownload date={match.date} matchId={match.id} />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button disabled className="rounded-full w-full">
                            Ticket obtained
                          </Button>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <Button disabled className="rounded-full w-full" asChild>
                        <Link href={"/sign-in"}>Get Ticket</Link>
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Button disabled className="rounded-full">
                    Match is finish
                  </Button>
                </>
              )}
            </div>
          </article>
        </main>
      </section>
    </section>
  );
};

export default MatchCard;
