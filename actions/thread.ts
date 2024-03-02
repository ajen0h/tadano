'use server';

import {db} from '@/lib/db';
import {auth} from '@clerk/nextjs';
import {z} from 'zod';

const threadSchema = z.object({
  title: z.string(),
  body: z.string(),
  description: z.string(),
});

type ThreadType = z.infer<typeof threadSchema>;

export const CreateThread = async (values: ThreadType) => {
  const {userId} = auth();
  if(!userId) return {error: 'Registration failed.'};
  try {
    const createThread = await db.thread.create({
      data: {
        title: values.title,
        body: values.body,
        description:values.description,
        userId: userId,
      },
    });
    return {success: 'Thread Created!'};
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
    },
  });

  return thread;
};
