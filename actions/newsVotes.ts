'use server';

import {auth} from '@/auth';
import {db} from '@/lib/db';
import {revalidatePath} from 'next/cache';
import { cookies } from 'next/headers';

export const getNewVoteByUser = async (newId: string) => {
  const session=await auth()
  if (!session?.user?.id) return {error: 'User is not registed!'};

  const votesByUser = await db.reportVotes.findFirst({
    where: {
      userId: session.user?.id,
      reportId: newId,
    },
  });
  return votesByUser;
};

export const likeVoteByUserIdAndNewId = async (reportId: string) => {

  const session=await auth()
  if (!session?.user?.id) return {error: 'User is not registed!'};
  try {
    const userVotes = await db.reportVotes.findUnique({
      where: {
        userId_reportId: {
          userId: session.user?.id,
          reportId,
        },
      },
    });

    if (!userVotes) {
      return {success: false};
    }

    return {success: true};
  } catch (error) {
    console.error('Registration failed:', error);
    return {error: 'Registration failed.'};
  }
};

export const likeVote = async (reportId: string) => {
  const lang = cookies().get('NEXT_LOCALE')?.value;
  const session=await auth()
  if (!session?.user?.id) return {error: 'User is not registed!'};
  try {
    const existsNewVotesUserAndNew = await db.reportVotes.findUnique({
      where: {
        userId_reportId: {
          userId: session.user?.id,
          reportId,
        },
      },
    });

    if (!existsNewVotesUserAndNew) {
      try {
        //si no existe
        await db.reportVotes.create({
          data: {
            userId: session.user?.id,
            reportId,
          },
        });
        revalidatePath(`${lang}/news`);
        return {message: 'Unliked Post.'};
      } catch (error) {
        return {message: 'Database Error: Failed to Unlike Post.'};
      }
    }

    await db.reportVotes.delete({
      where: {
        userId_reportId: {
          userId: session.user?.id,
          reportId,
        },
      },
    });

    revalidatePath(`${lang}/news`);

    return {success: 'Email sent!'};
  } catch (error) {
    console.error('Registration failed:', error);
    return {error: 'Registration failed.'};
  }
};
