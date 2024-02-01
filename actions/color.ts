'use server';
import {db} from '@/lib/db';
import {ColorSchema} from '@/schema';
import {Prisma} from '@prisma/client';
import {z} from 'zod';

export const getColor = async () => {
  const color = await db.color.findMany();
  return color;
};

export const getColorById = async (colorId: string) => {
  const color = await db.color.findUnique({
    where: {
      id: colorId,
    },
  });
  return color;
};

export const createColor = async (values: z.infer<typeof ColorSchema>) => {
  const validatedFields = ColorSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: 'Invalid Fields!'};
  }

  const {name, value} = validatedFields.data;

  const existingColor = await db.color.findFirst({
    where: {name},
  });

  if (existingColor) {
    return {error: 'Color name is used!'};
  }

  try {
    await db.color.create({
      data: {
        name,
        value,
      },
    });
    return {success: 'Color has been created!'};
  } catch (error) {
    return {error: 'Error creating color.'};
  }
};

export const deleteColor = async (colorId: string) => {
  try {
    await db.color.delete({
      where: {
        id: colorId,
      },
    });

    return {success: 'Color was deleted!'};
  } catch (error) {
    console.error('Registration failed:', error);
    return {error: 'Error deleting color.'};
  }
};

export const updateColor = async (
  colorId: string,
  values: z.infer<typeof ColorSchema>
) => {
  const validatedFields = ColorSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: 'Invalid Fields!'};
  }

  const {name, value} = validatedFields.data;

  try {
    await db.color.update({
      where: {
        id: colorId,
      },
      data: {
        name,
        value,
      },
    });
    return {success: 'Color has been updated!'};
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {error: "Color's name exist!"};
      }
    }
    return {error: 'Anything wrong!'};
  }
};
