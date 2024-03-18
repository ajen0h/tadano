'use server';
import {db} from '@/lib/db';
import {PlayerSchema} from '@/schema';
import {Prisma} from '@prisma/client';
import {z} from 'zod';

export const getPlayer = async () => {
  const player = await db.player.findMany();
  return player;
};

export const getPlayerById = async (playerId: string) => {
  const player = await db.player.findUnique({
    where: {
      id: playerId,
    },
  });
  return player;
};

export const createPlayer = async (values: z.infer<typeof PlayerSchema>) => {
  const validatedFields = PlayerSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: 'Invalid Fields!'};
  }

  const {
    name,
    lastname,
    age,
    description,
    imageUrl,
    assists,
    country,
    dorsal,
    goals,
    height,
    position,
    saves,
    teamId,
    weight,
  } = validatedFields.data;

  const existingPlayer = await db.player.findFirst({
    where: {name},
  });

  if (existingPlayer) {
    return {error: 'Player name is used!'};
  }

  try {
    await db.player.create({
      data: {
        name,
        lastname,
        age,
        description,
        imageUrl,
        assists,
        country,
        dorsal,
        goals,
        height,
        position,
        saves,
        teamId,
        weight,
      },
    });
    return {success: 'Player has been created!'};
  } catch (error) {
    return {error: 'Error creating player.'};
  }
};

export const deletePlayer = async (playerId: string) => {
  try {
    await db.player.delete({
      where: {
        id: playerId,
      },
    });

    return {success: 'Player was deleted!'};
  } catch (error) {
    console.error('Registration failed:', error);
    return {error: 'Error deleting player.'};
  }
};

export const updatePlayer = async (
  playerId: string,
  values: z.infer<typeof PlayerSchema>
) => {
  const validatedFields = PlayerSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: 'Invalid Fields!'};
  }

  const {
    name,
    age,
    lastname,
    description,
    imageUrl,
    assists,
    country,
    dorsal,
    goals,
    height,
    position,
    saves,
    teamId,
    weight,
  } = validatedFields.data;

  try {
    await db.player.update({
      where: {
        id: playerId,
      },
      data: {
        name,
        lastname,
        age,
        description,
        imageUrl,
        assists,
        country,
        dorsal,
        goals,
        height,
        position,
        saves,
        teamId,
        weight,
      },
    });
    return {success: 'Player has been updated!'};
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {error: "Player's name exist!"};
      }
    }
    return {error: 'Anything wrong!'};
  }
};
