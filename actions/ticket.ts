'use server';

import {auth} from '@/auth';
import {db} from '@/lib/db';
import {TicketSchema} from '@/schema';
import {revalidatePath} from 'next/cache';

export const CreateTicket = async (matchId: string) => {
  const session = await auth();
  if (!session?.user?.id) return {error: 'User is not registed!'};
  try {
    await db.ticket.create({
      data: {
        matchId,
        userId: session.user?.id,
      },
    });

    await db.match.update({
      where: {
        id: matchId,
      },
      data: {
        capacity: {
          decrement: 1,
        },
      },
    });
    revalidatePath('/fixtures');
    return {success: 'Ticket created!'};
  } catch (error) {
    console.error('Registration failed:', error);
    return {error: 'Ticket error.'};
  }
};

export const getTicketByUser = async (matchId: string) => {
  const session = await auth();
  if (!session?.user?.id) return {error: 'User is not registed!'};
  const ticketUser = await db.ticket.findUnique({
    where: {
      userId_matchId: {
        userId: session?.user?.id,
        matchId,
      },
    },
  });
  return ticketUser;
};
