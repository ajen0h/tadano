'use server';

import {db} from '@/lib/db';
import {auth} from '@clerk/nextjs/server';
import {revalidatePath} from 'next/cache';

export const getNewVoteByUser = async (newId: string) => {
  const {userId} = auth();

  if (userId) {
    const votesByUser = await db.reportVotes.findFirst({
      where: {
        userId,
        reportId: newId,
      },
    });
    return votesByUser;
  }
  return null;
};

export const likeVoteByUserIdAndNewId = async (reportId: string) => {
  const session = auth();
  if (!session.userId) {
    return {error: 'User not found!'};
  }
  try {
    const userVotes = await db.reportVotes.findUnique({
      where: {
        userId_reportId: {
          userId: session.userId,
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
  try {
    const session = auth();
    if (!session.userId) {
      return {error: 'User not found 👀!'};
    }

    const existsNewVotesUserAndNew = await db.reportVotes.findUnique({
      where: {
        userId_reportId: {
          userId: session.userId,
          reportId,
        },
      },
    });

    if (!existsNewVotesUserAndNew) {
      //si no existe
      await db.reportVotes.create({
        data: {
          userId: session.userId,
          reportId,
        },
      });
    } else {
      await db.reportVotes.delete({
        where: {
          userId_reportId: {
            userId: session.userId,
            reportId,
          },
        },
      });
    }

    revalidatePath(`news`);
    return {success: 'Email sent!'};
  } catch (error) {
    console.error('Registration failed:', error);
    return {error: 'Registration failed.'};
  }
};
