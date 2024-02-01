'use server';
import {db} from '@/lib/db';
import {SurveySchema} from '@/schema';
import {auth} from '@clerk/nextjs/server';
import {Prisma} from '@prisma/client';
import {revalidatePath} from 'next/cache';
import {z} from 'zod';

interface SurveyVote {
  surveyId: string;
  optionId: string;
}

export type SurveyWithSurveyVotes = Prisma.PromiseReturnType<typeof getSurveyById>

export const getSurvey = async () => {
  const survey = await db.survey.findMany({
    include: {
      SurveyVotes: true,
    },
  });
  return survey;
};



export const getSurveyById = async (surveyId: string) => {
  const survey = await db.survey.findUnique({
    where: {
      id: surveyId,
    },
    include: {
      SurveyVotes: true,
    },
  });
  return survey;
};

export const createSurvey = async (values: z.infer<typeof SurveySchema>) => {
  const validatedFields = SurveySchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: 'Invalid Fields!'};
  }

  const {option1, option2, title} = validatedFields.data;

  const existingSurvey = await db.survey.findFirst({
    where: {title},
  });

  if (existingSurvey) {
    return {error: 'Survey name is used!'};
  }

  try {
    await db.survey.create({
      data: {
        title,
        option1,
        option2,
        vote1: 0,
        vote2: 0,
      },
    });
    return {success: 'Survey has been created!'};
  } catch (error) {
    return {error: 'Error creating survey.'};
  }
};

export const deleteSurvey = async (surveyId: string) => {
  try {
    await db.survey.delete({
      where: {
        id: surveyId,
      },
    });

    return {success: 'Survey was deleted!'};
  } catch (error) {
    console.error('Registration failed:', error);
    return {error: 'Error deleting survey.'};
  }
};

export const updateSurvey = async (
  surveyId: string,
  values: z.infer<typeof SurveySchema>
) => {
  const validatedFields = SurveySchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: 'Invalid Fields!'};
  }

  const {option1, option2, title, vote1, vote2} = validatedFields.data;

  try {
    await db.survey.update({
      where: {
        id: surveyId,
      },
      data: {
        title,
        option1,
        option2,
        vote1: vote1 ? vote1 : 0,
        vote2: vote2 ? vote2 : 0,
      },
    });
    return {success: 'Survey has been updated!'};
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {error: "Survey's name exist!"};
      }
    }
    return {error: 'Anything wrong!'};
  }
};

export const surveyVote = async (values: SurveyVote) => {
  try {
    const session = auth();
    if (!session.userId) {
      return {error: 'You aren`t loggin'};
    }

    console.log(values);
    const currentSurvey = await db.survey.findUnique({
      where: {
        id: values.surveyId,
      },
    });

    if (!currentSurvey) {
      return {error: 'Survey doesn`t exist!'};
    }

    if (currentSurvey?.option1Id === values.optionId) {
      await db.survey.update({
        where: {
          id: values.surveyId,
        },
        data: {
          vote1: {increment: 1},
        },
      });
    } else {
      await db.survey.update({
        where: {
          id: values.surveyId,
        },
        data: {
          vote2: {increment: 1},
        },
      });
    }

    await db.surveyVotes.create({
      data: {
        userId: session.userId,
        surveyId: values.surveyId,
      },
    });

    revalidatePath('/test/survey');

    /*  return {success: 'Survey voted!'}; */
  } catch (error) {
    console.error('Registration failed:', error);
    return {error: 'Registration failed.'};
  }
};
