'use server';

import {db} from '@/lib/db';
import {auth} from '@clerk/nextjs';
import {z} from 'zod';

const threadSchema = z.object({
  title: z.string(),
  body: z.string(),
});

type ThreadType = z.infer<typeof threadSchema>;

export const CreateThread = async (values: ThreadType) => {
  const {userId} = auth();
  try {
    const createThread = await db.thread.create({
      data: {
        title: values.title,
        body: values.body,
        userId: userId,
      },
    });
    return {success: 'Email sent!'};
  } catch (error) {
    console.error('Registration failed:', error);
    return {error: 'Registration failed.'};
  }
};
