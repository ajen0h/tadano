import {CreateTicket, getTicketByUser} from '@/actions/ticket';
import {PdfDownload} from '@/app/[locale]/pdf/_components/pdf-generated';
import {ModalLoginRedirect} from '@/components/modal-login-redirect';
import {Button} from '@/components/ui/button';
import {Match, Team} from '@prisma/client';
import Image from 'next/image';
import {ButtonTicket} from './button-ticket';
import {auth} from '@/auth';

interface MatchCardProps {
  match: Match & {
    visitingTeam: Team;
  };
}

export const MatchCardFixtures = async ({match}: MatchCardProps) => {
  const session = await auth();
  const ticketUser = await getTicketByUser(match.id);
  return (
    <main className=" py-6 text-white border-b-white border-b">
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
          {match.capacity <= 0 ? (
            <>
              <Button disabled>Sold out</Button>
            </>
          ) : (
            <>
              {session?.user?.id ? (
                <>
                  {ticketUser ? (
                    <>
                      <Button disabled>Get ticket</Button>
                    </>
                  ) : (
                    <>
                    <ButtonTicket match={match} />
                    </>
                  )}
                </>
              ) : (
                <>
                  <ModalLoginRedirect title="Get Ticket" />
                </>
              )}
            </>
          )}
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
          {match.capacity <= 0 ? (
            <>
              <Button disabled>Sold out</Button>
            </>
          ) : (
            <>
              {session?.user?.id ? (
                <>
                  {ticketUser ? (
                    <>
                      <Button disabled>Get ticket</Button>
                    </>
                  ) : (
                    <>
                    <ButtonTicket match={match} />
                    </>
                  )}
                </>
              ) : (
                <>
                  <ModalLoginRedirect title="Get Ticket" />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
};
