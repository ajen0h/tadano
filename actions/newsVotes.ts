'use server';

import {db} from '@/lib/db';
import {auth} from '@clerk/nextjs/server';
import {revalidatePath} from 'next/cache';

export const likeVoteByUserIdAndNewId = async (newId: string) => {
  const session = auth();
  if (!session.userId) {
    return {error: 'User not found!'};
  }
  try {
    const userVotes = await db.newVotes.findUnique({
      where: {
        userId_newId: {
          userId: session.userId,
          newId,
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

export const likeVote = async (newId: string) => {
  try {
    console.log(newId);
    const session = auth();
    if (!session.userId) {
      return {error: 'User not found 👀!'};
    }

    const existsNewVotesUserAndNew = await db.newVotes.findUnique({
      where: {
        userId_newId: {
          userId: session.userId,
          newId,
        },
      },
    });

    if (!existsNewVotesUserAndNew) {
      //si no existe
      await db.newVotes.create({
        data: {
          userId: session.userId,
          newId,
        },
      });
    } else {
      await db.newVotes.delete({
        where: {
          userId_newId: {
            userId: session.userId,
            newId,
          },
        },
      });
    }

    revalidatePath(`test/new/${newId}`);
    return {success: 'Email sent!'};
  } catch (error) {
    console.error('Registration failed:', error);
    return {error: 'Registration failed.'};
  }
};
