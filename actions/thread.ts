'use server';

import {auth} from '@/auth';
import {db} from '@/lib/db';
import {ThreadSchema} from '@/schema';
import {revalidatePath} from 'next/cache';
import {z} from 'zod';

type ThreadType = z.infer<typeof ThreadSchema>;

export const CreateThread = async (values: ThreadType) => {
  const session = await auth();
  if (!session?.user?.id) return {error: 'User is not registed!'};
  try {
    const createThread = await db.thread.create({
      data: {
        title: values.title,
        body: values.body,
        description: values.description,
        userId: session.user?.id,
      },
    });
    revalidatePath("/forum")
    return {success:"Thread created!"}
  } catch (error) {
    console.error('Registration failed:', error);
    return {error: 'Registration failed.'};
  }
};

export const getThreads = async () => {
  const threads = await db.thread.findMany({
    include: {
      User: true,
    },
    orderBy:{
      createdAt:"desc"
    }
  });
  return threads;
};
export const getThread = async (threadId: string) => {
  const thread = await db.thread.findUnique({
    where: {
      id: threadId,
    },
    include: {
      User: true,
      comments: {
        include: {
          User: true,
        },
        orderBy:{
          createdAt:"desc"
        }
      },
      ThreadVotes: true,
    },
  });

  return thread;
};

export const likeThread = async (threadId: string) => {
  const session = await auth();
  if (!session?.user?.id) return {error: 'User is not registed!'};
  try {
    const existingThread = await db.threadVotes.findUnique({
      where: {
        userId_threadId: {
          threadId,
          userId: session?.user?.id,
        },
      },
    });

    if (!existingThread) {
      await db.threadVotes.create({
        data: {
          threadId,
          userId: session?.user?.id,
        },
      });
    } else {
      await db.threadVotes.delete({
        where: {
          userId_threadId: {
            threadId,
            userId: session?.user?.id,
          },
        },
      });
    }

    revalidatePath(`/forum/thread/${threadId}`);
  } catch (error) {
    console.error('Registration failed:', error);
    return {error: 'Registration failed.'};
  }
};

export const getThreadVotedByUserId = async (threadId: string) => {
  const session = await auth();
  if (!session?.user?.id) return false;
  try {
    const thread = await db.threadVotes.findFirst({
      where: {
        threadId,
        userId: session?.user?.id,
      },
    });
    if (thread) return true;
    return false;
  } catch (error) {
    console.error('Registration failed:', error);
    return false;
  }
};
