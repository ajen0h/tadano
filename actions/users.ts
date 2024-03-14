'user';

import {db} from '@/lib/db';

import {User} from '@prisma/client';
import {revalidatePath} from 'next/cache';
import {cookies} from 'next/headers';
import {string} from 'zod';

interface Email {
  email_address: string;
}

interface UserProps {
  id: string;
  first_name: string;
  image_url: string;
  email_addresses: Email[];
  last_name: string;
  username: string | null;
}

export const CreateUser = async (values: UserProps) => {
  const user = {
    id: values.id,
    email: values.email_addresses[0].email_address,
    first_name: values.first_name,
    image_url: values.image_url,
    last_name: values.last_name,
    username: values.username,
  };

  try {
    const newUser = await db.user.create({
      data: user,
    });

    return newUser;
  } catch (error) {
    console.error('Registration failed:', error);
    return {error: 'Registration failed.'};
  }
};

export const DeleteUser = async (userId: string) => {
  const lang = cookies().get('NEXT_LOCALE')?.value;

  try {
    const deletedUser = await db.user.delete({
      where: {
        id: userId,
      },
    });
    revalidatePath(`${lang}/dashboard/users`);
    return {success: 'User deleted!'};
  } catch (error) {
    console.error('Registration failed:', error);
    return {error: 'Something wrong!'};
  }
};

export const getUsersColumn = async () => {
  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });
  return users;
};
