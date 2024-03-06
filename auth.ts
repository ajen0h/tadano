import NextAuth from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import {getUserByEmail, getUserById} from './actions/auth';
import {PrismaAdapter} from '@auth/prisma-adapter';
import {db} from './lib/db';
import bcrypt from 'bcrypt';
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
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    credentials({
      async authorize(credentials: any) {
        /* const validatedFields=LoginSchema.safePase(credentials) */

        const user = await getUserByEmail(credentials.email);
        if (!user || !user.password) return null;

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (passwordMatch) {
          return user;
        }

        return null;
      },
    }),
  ],
});
