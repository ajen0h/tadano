'use client';

import {CreateTicket} from '@/actions/ticket';
import {PdfDownload} from '@/app/[locale]/pdf/_components/pdf-generated';
import {ModalLoginRedirect} from '@/components/modal-login-redirect';
import {Button} from '@/components/ui/button';
import {Match, Team} from '@prisma/client';
import {useSession} from 'next-auth/react';
import { useTranslations } from 'next-intl';
interface MatchCardProps {
  match: Match & {
    visitingTeam: Team;
    localTeam:Team
  };
}

export const ButtonTicket = ({match}: MatchCardProps) => {
  const t=useTranslations("General")
  return (
    <>
      <Button asChild onClick={() => CreateTicket(match.id)}>
        <PdfDownload date="1" match={match} />
      </Button>
    </>
  );
};
