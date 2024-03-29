'use server';
import {db} from '@/lib/db';
import {MatchSchema} from '@/schema';
import {Prisma} from '@prisma/client';
import {z} from 'zod';

export const getMatch = async () => {
  const match = await db.match.findMany({
    include:{
      localTeam:true,
      visitingTeam:true
    }
  });
  return match;
};
export const getMatchFinished = async () => {
  const match = await db.match.findMany({
    where:{
      isFinish:true
    },
    include:{
      localTeam:true,
      visitingTeam:true
    }
  });
  return match;
};

export const getMatchFinishedLimit2 = async () => {
  const match = await db.match.findMany({
    where:{
      isFinish:true
      
    },
    include:{
      localTeam:true,
      visitingTeam:true
    },
    orderBy:{
      createdAt:"asc"
    },
    take:2

  });
  return match;
};
export const getMatchNotFinishedLimit2 = async () => {
  const match = await db.match.findMany({
    where:{
      isFinish:false
      
    },
    include:{
      localTeam:true,
      visitingTeam:true
    },
    orderBy:{
      createdAt:"asc"
    },
    take:2

  });
  return match;
};
export const getMatchNotFinished = async () => {
  const match = await db.match.findMany({
    where:{
      isFinish:false
    },
    include:{
      localTeam:true,
      visitingTeam:true
    }
  });
  return match;
};

export const getMatchById = async (matchId: string) => {
  const match = await db.match.findUnique({
    where: {
      id: matchId,
    },
  });
  return match;
};

export const createMatch = async (values: z.infer<typeof MatchSchema>) => {
  const validatedFields = MatchSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: 'Invalid Fields!'};
  }

  const {
    league,
    date,
    isFinish,
    localGoals,
    localTeamId,
    stadium,
    visitingGoals,
    visitingTeamId,
    capacity
  } = validatedFields.data;

  try {
    
    await db.match.create({
      data: {
        league,
        date,
        isFinish,
        localGoals,
        localTeamId,
        stadium,
        visitingGoals,
        visitingTeamId,
        capacity
      },
    });
    return {success: 'Match has been created!'};
  } catch (error) {
    return {error: 'Error creating match.'};
  }
};

export const deleteMatch = async (matchId: string) => {
  try {
    await db.match.delete({
      where: {
        id: matchId,
      },
    });

    return {success: 'Match was deleted!'};
  } catch (error) {
    console.error('Registration failed:', error);
    return {error: 'Error deleting match.'};
  }
};

export const updateMatch = async (
  MatchId: string,
  values: z.infer<typeof MatchSchema>
) => {
  const validatedFields = MatchSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: 'Invalid Fields!'};
  }

  const {
    league,
    date,
    isFinish,
    localGoals,
    localTeamId,
    stadium,
    visitingGoals,
    visitingTeamId,
    capacity
  } = validatedFields.data;

  try {
    await db.match.update({
      where: {
        id: MatchId,
      },
      data: {
        league,
        date,
        isFinish,
        localGoals,
        localTeamId,
        stadium,
        visitingGoals,
        visitingTeamId,
        capacity,
      },
    });
    return {success: 'Match has been updated!'};
  } catch (error:any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {error: "Match's name exist!"};
      }
    }
    return {error: 'Anything wrong!'};
  }
};
