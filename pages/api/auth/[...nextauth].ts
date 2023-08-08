import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { auth } from '../../../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        try {
          const { user } = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          return { id: user.uid, email: user.email };
        } catch (error) {
          throw new Error('Invalid username/password');
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (typeof token.id === 'string') {
        session.id = token.id;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
