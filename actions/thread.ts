'use server';

import {auth} from '@/auth';
import {db} from '@/lib/db';
import {ThreadSchema, ThreadUpdateSchema} from '@/schema';
import {revalidatePath, revalidateTag} from 'next/cache';
import {cookies} from 'next/headers';
import {z} from 'zod';

type ThreadType = z.infer<typeof ThreadSchema>;
type ThreadUpdateType = z.infer<typeof ThreadUpdateSchema>;

export const CreateThread = async (values: ThreadType) => {
  const lang = cookies().get('NEXT_LOCALE')?.value;
  const session = await auth();
  if (!session?.user?.id) return {error: 'User is not registed!'};
  try {
    const createThread = await db.thread.create({
      data: {
        title: values.title,
        body: values.body,
        description: values.description,
        categoryThreadsId: values.categoryId,
        userId: session.user?.id,
      },
    });

    return {success: 'Thread created!'};
  } catch (error) {
    console.error('Registration failed:', error);
    /*  return {error: 'Registration failed.'}; */
  }
};
export const updateThread = async (threadId: string, values: ThreadUpdateType) => {
  const lang = cookies().get('NEXT_LOCALE')?.value;
  const session = await auth();
  if (!session?.user?.id) return {error: 'User is not registed!'};
  try {
    const createThread = await db.thread.update({
      where: {
        id: threadId,
      },
      data: {
        title: values.title,
        body: values.body,
        description: values.description,
        categoryThreadsId: values.categoryThreadsId,
        userId: session.user?.id,
      },
    });
    revalidatePath(`/${lang}/profile`)
    return {success: 'Thread updated!'};
  } catch (error) {
    console.error('Registration failed:', error);
    /*  return {error: 'Registration failed.'}; */
  }
};
export const deleteThread = async (threadId: string) => {
  const lang = cookies().get('NEXT_LOCALE')?.value;
  const session = await auth();
  if (!session?.user?.id) return {error: 'User is not registed!'};
  try {
    const createThread = await db.thread.delete({
      where: {
        id: threadId,
      },
    });

    revalidatePath(`${lang}/profile`);
    return {success: 'Thread deleted!'};
  } catch (error) {
    console.error('Registration failed:', error);
    /*  return {error: 'Registration failed.'}; */
  }
};
export const getThreads = async (
  term?: string,
  sort?: string,
  categoryName?: string
) => {
  const threads = await db.thread.findMany({
    where: {
      title: {
        contains: term?.toString(),
      },
      CategoryThreads: {
        name: categoryName?.toString(),
      },
    },

    include: {
      CategoryThreads: true,
      User: true,
      ThreadVotes: true,
    },
    orderBy: {
      createdAt: sort?.toLowerCase() === 'asc' ? 'asc' : 'desc',
    },
  });
  return threads;
};
export const getThread = async (threadId: string) => {
  const thread = await db.thread.findUnique({
    where: {
      id: threadId,
    },
    include: {
      CategoryThreads: true,
      User: true,
      comments: {
        include: {
          User: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
      ThreadVotes: true,
    },
  });

  return thread;
};

export const likeThread = async (threadId: string) => {
  console.log('idol');
  const lang = cookies().get('NEXT_LOCALE')?.value;
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

    /* revalidatePath(`${lang}/forum/thread/${threadId}`); */
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
