import credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import {getUserByEmail, getUserById} from './actions/auth';
import type { NextAuthConfig } from "next-auth";
import bcrypt from 'bcrypt';
import {SignInSchema} from './schema';

export default{
    providers: [
        Google({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        credentials({
          async authorize(credentials: any) {
            const validatedFields = SignInSchema.safeParse(credentials);
            if (validatedFields.success) {
              const {email, password} = validatedFields.data;
    
              const user = await getUserByEmail(email);
              if (!user || !user.password) {
                return null;
              }
    
              const passwordMatch = await bcrypt.compare(password, user.password);
              
              if (passwordMatch){
                return user;
              } 
            }
            return null;
          },
        }),
      ],
}satisfies NextAuthConfig