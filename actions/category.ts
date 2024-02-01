'use server';
import {db} from '@/lib/db';
import {CategorySchema} from '@/schema';
import {Prisma} from '@prisma/client';
import {z} from 'zod';

export const getCategory = async () => {
  const category = await db.category.findMany();
  return category;
};

export const getCategoryById = async (categoryId: string) => {
  const category = await db.category.findUnique({
    where: {
      id: categoryId,
    },
  });
  return category;
};

export const createCategory = async (
  values: z.infer<typeof CategorySchema>
) => {
  const validatedFields = CategorySchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: 'Invalid Fields!'};
  }

  const {name} = validatedFields.data;

  const existingCategory = await db.category.findFirst({
    where: {name},
  });

  if (existingCategory) {
    return {error: 'Category name is used!'};
  }

  try {
    await db.category.create({
      data: {
        name,
      },
    });
    return {success: 'Category has been created!'};
  } catch (error) {
    return {error: 'Error creating category.'};
  }
};

export const deleteCategory = async (categoryId: string) => {
  try {
    await db.category.delete({
      where: {
        id: categoryId,
      },
    });

    return {success: 'Category was deleted!'};
  } catch (error) {
    console.error('Registration failed:', error);
    return {error: 'Error deleting category.'};
  }
};

export const updateCategory = async (
  categoryId: string,
  values: z.infer<typeof CategorySchema>
) => {
  const validatedFields = CategorySchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: 'Invalid Fields!'};
  }

  const {name} = validatedFields.data;

  try {
    await db.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
      },
    });
    return {success: 'Category has been updated!'};
  } catch (error: any) {
    if (error.constructor.name === Prisma.PrismaClientKnownRequestError.name) {
      if (error.code === 'P2002') {
        return {error: "Category's name exist!"};
      }
    }
    return {error: 'Anything wrong!'};
  }
};
