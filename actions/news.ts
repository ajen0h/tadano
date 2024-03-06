'use server';
import {db} from '@/lib/db';
import {NewSchema} from '@/schema';
import {auth} from '@clerk/nextjs';
import {Prisma} from '@prisma/client';
import {z} from 'zod';

export const getNews = async () => {
  const news = await db.report.findMany({
    include: {
      User: true,
    },
  });
  return news;
};
export const getNewById = async (newId: string) => {
  try {
    const newFound = await db.report.findUnique({
      where: {
        id: newId,
      },
      include: {
        ReportVotes: true,
        User: true,
      },
    });
    return newFound
  } catch (error) {
    console.log(error);
  }
};

export const createNew = async (values: z.infer<typeof NewSchema>) => {
  const {userId} = auth();

  if (!userId) return {error: 'User is not registed!'};

  const validatedFields = NewSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: 'Invalid Fields!'};
  }

  const {title, description, body, imageUrl} = validatedFields.data;

  const existingNew = await db.report.findFirst({
    where: {title},
  });

  if (existingNew) {
    return {error: 'New name is used!'};
  }

  try {
    await db.report.create({
      data: {
        title,
        description,
        body,
        imageUrl,
        userId,
      },
    });
    return {success: 'New has been created!'};
  } catch (error) {
    return {error: 'Error creating new.'};
  }
};

export const deleteNew = async (NewId: string) => {
  try {
    await db.report.delete({
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
  const {userId} = auth();
  if (!userId) return {error: 'User is not registed!'};
  const validatedFields = NewSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: 'Invalid Fields!'};
  }

  const {title, description, body, imageUrl} = validatedFields.data;

  try {
    await db.report.update({
      where: {
        id: NewId,
      },
      data: {
        title,
        body,
        description,
        imageUrl,
        userId,
      },
    });
    return {success: 'New has been updated!'};
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {error: "New's name exist!"};
      }
    }
    return {error: 'Anything wrong!'};
  }
};

export const getNewsInfinity = async (limit: number, pageParam: string) => {
  try {
    const news = await db.report.findMany({
      take: limit,
      skip: (parseInt(pageParam) - 1) * limit, // skip should start from 0 for page 1
      orderBy: {
        createdAt: 'desc',
      },
    });
    return news;
  } catch (error) {
    console.error('Registration failed:', error);
    return {error: 'Registration failed.'};
  }
};
