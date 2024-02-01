'use server';
import {db} from '@/lib/db';
import {ProductSchema} from '@/schema';
import {Prisma} from '@prisma/client';
import {z} from 'zod';

export const getProducts = async () => {
  const products = await db.product.findMany({
    include: {
      images: true,
      category: true,
      color: true,
      size: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return products;
};

export const getProductById = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: true,
    },
  });
  return product;
};

export const createProduct = async (values: z.infer<typeof ProductSchema>) => {
  const validatedFields = ProductSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: 'Invalid Fields!'};
  }

  const {name, description, price, images, cantidad, categoryId, colorId, sizeId} =
    validatedFields.data;

  console.log('Hola', images[0].url);

  try {
    await db.product.create({
      data: {
        name,
        description,
        price,
        categoryId,
        colorId,
        sizeId,
        cantidad,
        images: {
          createMany: {
            data: [
              ...images.map((image: {url: string}) => ({image: image.url})),
            ],
          },
        },
      },
    });
    return {success: 'Product has been created!'};
  } catch (error) {
    console.log(error);
    return {error: 'Error creating product.'};
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    await db.product.delete({
      where: {
        id: productId,
      },
    });

    return {success: 'Product was deleted!'};
  } catch (error) {
    console.error('Registration failed:', error);
    return {error: 'Error deleting product.'};
  }
};

export const updateProduct = async (
  productId: string,
  values: z.infer<typeof ProductSchema>
) => {
  const validatedFields = ProductSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: 'Invalid Fields!'};
  }

  const {name} = validatedFields.data;

  try {
    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
      },
    });
    return {success: 'Product has been updated!'};
  } catch (error) {
    return {error: 'Anything wrong!'};
  }
};
