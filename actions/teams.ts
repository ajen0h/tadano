'use server';
import {db} from '@/lib/db';
import {TeamSchema} from '@/schema';
import {Prisma} from '@prisma/client';
import {z} from 'zod';

export const getTeam = async () => {
  const team = await db.team.findMany();
  return team;
};

export const getTeamById = async (teamId: string) => {
  const team = await db.team.findUnique({
    where: {
      id: teamId,
    },
  });
  return team;
};

export const createTeam = async (values: z.infer<typeof TeamSchema>) => {
  const validatedFields = TeamSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: 'Invalid Fields!'};
  }

  const {name, imageUrl} = validatedFields.data;

  const existingTeam = await db.team.findFirst({
    where: {name},
  });

  if (existingTeam) {
    return {error: 'Team name is used!'};
  }

  try {
    await db.team.create({
      data: {
        name,
        imageUrl,
      },
    });
    return {success: 'Team has been created!'};
  } catch (error) {
    return {error: 'Error creating team.'};
  }
};

export const deleteTeam = async (TeamId: string) => {
  try {
    await db.team.delete({
      where: {
        id: TeamId,
      },
    });

    return {success: 'Team was deleted!'};
  } catch (error) {
    console.error('Registration failed:', error);
    return {error: 'Error deleting team.'};
  }
};

export const updateTeam = async (
  TeamId: string,
  values: z.infer<typeof TeamSchema>
) => {
  const validatedFields = TeamSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: 'Invalid Fields!'};
  }

  const {name, imageUrl} = validatedFields.data;

  try {
    await db.team.update({
      where: {
        id: TeamId,
      },
      data: {
        name,
        imageUrl,
      },
    });
    return {success: 'Team has been updated!'};
  } catch (error:any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {error: "Team's name exist!"};
      }
    }
    return {error: 'Anything wrong!'};
  }
};
