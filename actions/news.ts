'use server';
import {db} from '@/lib/db';
import {NewSchema} from '@/schema';
import {Prisma} from '@prisma/client';
import {z} from 'zod';

export const getNew = async () => {
  const news = await db.new.findMany({
    include: {
      comments: true,
      NewVotes:true
    },
  });
  return news;
};

export const getNewById = async (newId: string) => {
  const newFound = await db.new.findUnique({
    where: {
      id: newId,
    },
    include: {
      comments: {
        orderBy:{
          createdAt:"desc"
        }
      },
      NewVotes:true
    },
  });
  return newFound;
};

export const createNew = async (values: z.infer<typeof NewSchema>) => {
  const validatedFields = NewSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: 'Invalid Fields!'};
  }

  const {title, body, imageUrl} = validatedFields.data;

  const existingNew = await db.new.findFirst({
    where: {title},
  });

  if (existingNew) {
    return {error: 'New name is used!'};
  }

  try {
    await db.new.create({
      data: {
        title,
        body,
        imageUrl,
      },
    });
    return {success: 'New has been created!'};
  } catch (error) {
    return {error: 'Error creating new.'};
  }
};

export const deleteNew = async (NewId: string) => {
  try {
    await db.new.delete({
      where: {
        id: NewId,
      },
    });

    return {success: 'New was deleted!'};
  } catch (error) {
    console.error('Registration failed:', error);
    return {error: 'Error deleting new.'};
  }
};

export const updateNew = async (
  NewId: string,
  values: z.infer<typeof NewSchema>
) => {
  const validatedFields = NewSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: 'Invalid Fields!'};
  }

  const {title, body, imageUrl} = validatedFields.data;

  try {
    await db.new.update({
      where: {
        id: NewId,
      },
      data: {
        title,
        body,
        imageUrl,
      },
    });
    return {success: 'New has been updated!'};
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {error: "New's name exist!"};
      }
    }
    return {error: 'Anything wrong!'};
  }
};
