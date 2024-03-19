

import { getTicketByUser } from "@/actions/ticket";
import { FechaThread } from "@/app/[locale]/forum/_components/fecha-thread";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Match, Team } from "@prisma/client";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { ButtonTicket } from "./button-ticket";
import { ModalLoginRedirect } from "@/components/modal-login-redirect";

interface MatchCardProps {
    matchnotfi: Match & {
      visitingTeam: Team;
      localTeam:Team
    };
  }

export const Matches = async ({matchnotfi}:MatchCardProps) => {
    const session=await auth()
    const ticketUser = await getTicketByUser(matchnotfi.id);
  return <article
  key={matchnotfi.id}
  className="bg-gray-100 rounded-xl px-4 py-6">
  <div>
    <p className="text-end font-bold lg:text-lg lg:pb-4">
      {matchnotfi.league}
    </p>
  </div>
  <div className="flex flex-row justify-center items-center gap-4 px-5">
    <div className="relative h-[60px] w-[60px] lg:h-[90px] lg:w-[90px]">
      <Image
        src={`${matchnotfi.localTeam.imageUrl}`}
        alt="elyoya"
        fill
        className="object-cover  rounded-full "
      />
    </div>
    <p className="font-bold">VS</p>
    <div className="relative h-[60px] w-[60px] lg:h-[90px] lg:w-[90px]">
      <Image
        src={`${matchnotfi.localTeam.imageUrl}`}
        alt="elyoya"
        fill
        className="object-cover  rounded-full "
      />
    </div>
  </div>
  <div className="px-5 pt-4">
    <div className="flex flex-row justify-center items-center">
      <p className="text-lg lg:text-xl">
        {matchnotfi.localTeam.name}
      </p>
    </div>
    <div className="flex flex-row justify-center items-center">
      <p className="text-lg lg:text-xl">
        {matchnotfi.visitingTeam.name}
      </p>
    </div>
  </div>
  <div className="px-5 pt-3">
    <p className="flex flex-row items-center justify-center gap-2  opacity-70 text-sm lg:text-lg">
      <Calendar className="opacity-70" />
      <FechaThread createdAt={matchnotfi.createdAt} />
    </p>
  </div>
  <div className="px-5 pt-3 pb-3">
    <p className="flex flex-row items-center justify-center gap-2  opacity-70 text-sm lg:text-lg">
      <MapPin className="opacity-70" />
      {matchnotfi.stadium}
    </p>
  </div>
  {matchnotfi.capacity <= 0 ? (
<>
  <Button disabled>Sold out</Button>
</>
) : (
<>
  {session?.user?.id ? (
    <>
      {ticketUser ? (
        <>
          <Button disabled className="w-full">Get ticket</Button>
        </>
      ) : (
        <>
        <ButtonTicket match={matchnotfi} />
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
</article>
};