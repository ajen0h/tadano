'use server';
import {auth} from '@/auth';
import {db} from '@/lib/db';
import {CommentSchema} from '@/schema';
import {revalidatePath} from 'next/cache';
import {z} from 'zod';

export const getComment = async () => {
  const comment = await db.comment.findMany();
  return comment;
};

export const getCommentById = async (commentId: string) => {
  const comment = await db.comment.findUnique({
    where: {
      id: commentId,
    },
  });
  return comment;
};

export const createComment = async (
  values: z.infer<typeof CommentSchema>,
  threadId: string
) => {
  const session = await auth();

  if (!session?.user?.id) {
    return {error: 'User does`t loggin!'};
  }
  const validatedFields = CommentSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: 'Invalid Fields!'};
  }

  const {body} = validatedFields.data;

  try {
    
    await db.comment.create({
      data: {
        body,
        threadId,
        userId: session.user.id,
      },
    });

    revalidatePath(`forum/thread/${threadId}`);
    return {success: 'Comment has been created!'};
  } catch (error) {
    console.log(error);
    return {error: 'Error creating comment.'};
  }
};
/*
export const deleteComment = async (commentId: string) => {
  try {
    await db.comment.delete({
      where: {
        id: commentId,
      },
    });

    revalidatePath(`/test/news/${commentId}`);
  } catch (error) {
    console.error('Registration failed:', error);
    return {error: 'Error deleting comment.'};
  }
};

export const updateComment = async (
  commentId: string,
  values: z.infer<typeof CommentSchema>
) => {
  const session = await auth();

  if (!session?.user) {
    return {error: 'User does`t loggin!'};
  }
  const validatedFields = CommentSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: 'Invalid Fields!'};
  }

  const {body} = validatedFields.data;

  try {
    const updatedComment = await db.comment.update({
      where: {
        id: commentId,
      },
      data: {
        body,
        userId: session.user.id,
      },
    });
    if (!updatedComment) {
      return {error: 'Comment error!'};
    }

    revalidatePath(`/test/news/${commentId}`);
    return {success: 'Comment has been updated!'};
  } catch (error) {
    return {error: "Comment's name exist!"};
  }
};
 */
