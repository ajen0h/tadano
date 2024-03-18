import NextAuth from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import {getUserByEmail, getUserById} from './actions/auth';
import {PrismaAdapter} from '@auth/prisma-adapter';
import {db} from './lib/db';
import bcrypt from 'bcrypt';
import {SignInSchema} from './schema';
import authConfig from './auth.config';
export const {
  handlers: {GET, POST},
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  ...authConfig,

  callbacks: {
    async session({token, session}) {
      //tokem.sub==id
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        //@ts-ignore
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({token}) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },
  },
});
