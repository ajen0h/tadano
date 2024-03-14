'use server';

import {db} from '@/lib/db';
import { AdviseSchema } from '@/schema';
import { z } from 'zod';

export const getAdvice = async () => {
  const advice = await db.advise.findMany();
  return advice;
};

export const createAdvice = async (newId:string,values: z.infer<typeof AdviseSchema>) => {
  try {
    const advice=await db.advise.create({
        data:{
            newId,
            body:values.body
        }
    })
    return { success: 'Advise sent!' };
  } catch (error) {
    console.error('Registration failed:', error);
    return { error: 'Registration failed.' };
  }
};