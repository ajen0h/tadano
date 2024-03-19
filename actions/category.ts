'use server';
import {db} from '@/lib/db';
import {CategorySchema} from '@/schema';
import {Prisma} from '@prisma/client';
import {revalidatePath} from 'next/cache';
import {cookies} from 'next/headers';
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
export const getCategoryThread = async () => {
  const category = await db.categoryThreads.findMany();
  return category;
};

export const getCategoryThreadById = async (categoryThreadId: string) => {
  const category = await db.categoryThreads.findUnique({
    where: {
      id: categoryThreadId,
    },
  });
  return category;
};

export const createCategoryThread = async (
  values: z.infer<typeof CategorySchema>
) => {
  const lang = cookies().get('NEXT_LOCALE')?.value;
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
    await db.categoryThreads.create({
      data: {
        name,
      },
    });
    revalidatePath(`/${lang}/dashboard/categoryThread`);
    return {success: 'Category has been created!'};
  } catch (error) {
    return {error: 'Error creating category.'};
  }
};

export const deleteCategoryThread = async (categoryId: string) => {
  const lang = cookies().get('NEXT_LOCALE')?.value;
  try {
    await db.categoryThreads.delete({
      where: {
        id: categoryId,
      },
    });
    revalidatePath(`/${lang}/dashboard/categoryThread`);

    return {success: 'Category was deleted!'};
  } catch (error) {
    console.error('Registration failed:', error);
    return {error: 'Error deleting category.'};
  }
};

export const updateCategoryThread = async (
  categoryId: string,
  values: z.infer<typeof CategorySchema>
) => {
  const lang = cookies().get('NEXT_LOCALE')?.value;
  const validatedFields = CategorySchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: 'Invalid Fields!'};
  }

  const {name} = validatedFields.data;

  try {
    await db.categoryThreads.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
      },
    });
    /* revalidatePath(`/${lang}/dashboard/category`); */
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
export const createCategory = async (
  values: z.infer<typeof CategorySchema>
) => {
  const lang = cookies().get('NEXT_LOCALE')?.value;
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
    /* revalidatePath(`/${lang}/dashboard/category`); */
    return {success: 'Category has been created!'};
  } catch (error) {
    return {error: 'Error creating category.'};
  }
};

export const deleteCategory = async (categoryId: string) => {
  const lang = cookies().get('NEXT_LOCALE')?.value;
  try {
    await db.category.delete({
      where: {
        id: categoryId,
      },
    });
    revalidatePath(`/${lang}/dashboard/category`);

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
  const lang = cookies().get('NEXT_LOCALE')?.value;
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
    revalidatePath(`/${lang}/dashboard/category`);
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

export const InfinityCategoryInitial = async () => {
  const initialItems = await db.category.findMany({
    take: 5, // Tomamos solo los primeros 5 elementos inicialmente
  });
  return initialItems;
};

export const InfinityCategory = async (itemLength: number) => {
  const categories = await db.category.findMany({
    // Opciones de consulta para paginación
    skip: itemLength,
    take: 2, // Por ejemplo, cargar 10 elementos a la vez
  });
  return categories;
};
