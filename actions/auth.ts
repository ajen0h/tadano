'use server';

import {signIn} from '@/auth';
import {db} from '@/lib/db';
import {SignInSchema, SignUpSchema} from '@/schema';
import {z} from 'zod';
import bcrypt from 'bcrypt';
import {cookies} from 'next/headers';
import {AuthError} from 'next-auth';
import {redirect} from '@/navigation';
import {revalidatePath} from 'next/cache';

export const register = async (values: z.infer<typeof SignUpSchema>) => {
  const lang = cookies().get('NEXT_LOCALE')?.value;
  const {name, email, password,description} = values;
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
        description
      },
    });

    return {success: 'User created'};
  } catch (error) {
    console.error('Registration failed:', error);
    return {error: 'Registration failed.'};
  }
};

export const login = async (values: z.infer<typeof SignInSchema>) => {
  const lang = cookies().get('NEXT_LOCALE')?.value;
  const validatedFields = SignInSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: 'Credentials error.'};
  }
  const {email, password} = validatedFields.data;

  try {
    await signIn('credentials', {
      email,
      password,
    });
    /* revalidatePath(`/${lang}/`); */
    return {success: ''};
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {error: 'Credentials error.'};
        default: {
          return {error: 'Something went wrong!.'};
        }
      }
    }
  }
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
