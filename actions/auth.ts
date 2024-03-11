'use server';

import {signIn} from '@/auth';
import {db} from '@/lib/db';
import {SignInSchema, SignUpSchema} from '@/schema';
import {z} from 'zod';
import bcrypt from 'bcrypt';

export const register = async (values: z.infer<typeof SignUpSchema>) => {
  const {name, email, password} = values;
  const hashedPassword = await bcrypt.hash(password, 12);

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) return {error: 'Email already exist!'};
  try {
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return {success: 'User created'};
  } catch (error) {
    console.error('Registration failed:', error);
    return {error: 'Registration failed.'};
  }
};

export const login = async (values: z.infer<typeof SignInSchema>) => {
  const {email, password} = values;

  const loggin = await signIn('credentials', {
    email,
    password,
  });
if(loggin){
  return {success: 'Login!'};

}

  return {error: 'Credentials error.'};
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.error('Registration failed:', error);
    console.log(error);
  }
};
export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    console.error('Registration failed:', error);
    console.log(error);
  }
};
