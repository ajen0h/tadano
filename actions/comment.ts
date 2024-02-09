'use server';
import {db} from '@/lib/db';
import {CommentSchema} from '@/schema';
import {auth, currentUser} from '@clerk/nextjs/server';
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
  newId: string
) => {
  const session = await currentUser();

  if (!session) {
    return {error: 'User does`t loggin!'};
  }
  const validatedFields = CommentSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: 'Invalid Fields!'};
  }

  const {body} = validatedFields.data;

  try {
    console.log(session);
    await db.comment.create({
      data: {
        body, 
        reportId:newId,
        
      },
    });

    revalidatePath(`new/${newId}`);

    return {success: 'Comment has been created!'};
  } catch (error) {
    return {error: 'Error creating comment.'};
  }
};

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
  const session = auth();

  if (!session.userId) {
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
