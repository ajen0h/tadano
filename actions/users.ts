'use server';

import {db} from '@/lib/db';
import {UserSchema} from '@/schema';

import {Prisma, User, UserRole} from '@prisma/client';
import {revalidatePath} from 'next/cache';
import {cookies} from 'next/headers';

import {z} from 'zod';

export const getUser = async () => {
  const users = await db.user.findMany();
  return users;
};
export const getUserbyId = async (id: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    console.error('Registration failed:', error);
    console.log(error);
  }
};
export const getCommentsByUser = async (userId: string) => {
  const users = await db.comment.findMany({
    where: {
      userId
    },
  });
  return users;
};
export const getOrderByUser = async (userId: string) => {
  const users = await db.order.findMany({
    where: {
      userId
    },
  });
  return users;
};
export const getThreadVotesByUser = async (userId: string) => {
  const users = await db.threadVotes.findMany({
    where: {
      userId
    },
    include:{
      thread:true
    }
  });
  return users;
};
export const getThreadByUser = async (userId: string) => {
  const users = await db.thread.findMany({
    where: {
      userId
    },
  });
  return users;
};
export const getCommentsVotesByUser = async (userId: string) => {
  const users = await db.commentVotes.findMany({
    where: {
      userId
    },
  });
  return users;
};



export const createUser = async (values: z.infer<typeof UserSchema>) => {
  const lang = cookies().get('NEXT_LOCALE')?.value;
  const validatedFields = UserSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: 'Invalid Fields!'};
  }

  const {email, imageUrl, name, password, role} = validatedFields.data;

  try {
    const users = await db.user.create({
      data: {
        email,
        image: imageUrl,
        name,
        password,
        role: role === 'User' ? UserRole.USER : UserRole.ADMIN,
      },
    });
    revalidatePath(`${lang}/dashboard/user`);
    return {success: 'User has been created!'};
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {error: "User's email exist!"};
      }
    }
    return {error: 'Anything wrong!'};
  }
};

export const DeleteUser = async (userId: string) => {
  const lang = cookies().get('NEXT_LOCALE')?.value;

  try {
    const deletedUser = await db.user.delete({
      where: {
        id: userId,
      },
    });
    revalidatePath(`${lang}/dashboard/user`);
    return {success: 'User deleted!'};
  } catch (error) {
    console.error('Registration failed:', error);
    return {error: 'Something wrong!'};
  }
};

export const UpdateUser = async (
  userId: string,
  values: z.infer<typeof UserSchema>
) => {
  const lang = cookies().get('NEXT_LOCALE')?.value;
  const validatedFields = UserSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: 'Invalid Fields!'};
  }
  const {email, imageUrl, name, password, role} = validatedFields.data;
  try {
    const updatedUser = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        email,
        image: imageUrl,
        name,
        password,
        role: role === 'User' ? UserRole.USER : UserRole.ADMIN,
      },
    });
    revalidatePath(`${lang}/dashboard/user`);
    return {success: 'User has been updated!'};
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {error: "User's name exist!"};
      }
    }
    return {error: 'Anything wrong!'};
  }
};
