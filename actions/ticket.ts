'use server';

import {db} from '@/lib/db';
import {TicketSchema} from '@/schema';
import {auth} from '@clerk/nextjs';
import {revalidatePath} from 'next/cache';

export const CreateTicket = async (matchId: string) => {
  const {userId} = auth();
  if (!userId) return {error: 'User not found!'};
  try {
    await db.ticket.create({
      data: {
        matchId,
        userId,
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
  const {userId} = auth();
  if (!userId) return;
  const ticketUser = await db.ticket.findUnique({
    where: {
      userId_matchId: {
        userId,
        matchId,
      },
    },
  });
  return ticketUser
};
