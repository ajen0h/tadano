'use server';
import {db} from '@/lib/db';
import {SizeSchema} from '@/schema';
import {Prisma} from '@prisma/client';
import {z} from 'zod';

export const getSize = async () => {
  const size = await db.size.findMany();
  return size;
};

export const getSizeById = async (sizeId: string) => {
  const size = await db.size.findUnique({
    where: {
      id: sizeId,
    },
  });
  return size;
};

export const createSize = async (values: z.infer<typeof SizeSchema>) => {
  const validatedFields = SizeSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: 'Invalid Fields!'};
  }

  const {name, value} = validatedFields.data;

  const existingSize = await db.size.findFirst({
    where: {name},
  });

  if (existingSize) {
    return {error: 'Size name is used!'};
  }

  try {
    await db.size.create({
      data: {
        name,
        value,
      },
    });
    return {success: 'Size has been created!'};
  } catch (error) {
    return {error: 'Error creating size.'};
  }
};

export const deleteSize = async (sizeId: string) => {
  try {
    await db.size.delete({
      where: {
        id: sizeId,
      },
    });

    return {success: 'Size was deleted!'};
  } catch (error) {
    console.error('Registration failed:', error);
    return {error: 'Error deleting size.'};
  }
};

export const updateSize = async (
  sizeId: string,
  values: z.infer<typeof SizeSchema>
) => {
  const validatedFields = SizeSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: 'Invalid Fields!'};
  }

  const {name, value} = validatedFields.data;

  try {
    await db.size.update({
      where: {
        id: sizeId,
      },
      data: {
        name,
        value,
      },
    });
    return {success: 'Size has been updated!'};
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {error: "Size's name exist!"};
      }
    }
    return {error: 'Anything wrong!'};
  }
};
