import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    signIn: ({ user }) => {
      // メールアドレスが指定ドメインの場合はログイン画面へリダイレクト
      if (user.email) {
        const domain = user.email.split('@')[1];
        const allowDomains = process.env.NEXTAUTH_ALLOWED_DOMAINS.split(',');
        if (allowDomains.includes(domain)) return true;
      }

      return false;
    },
  },
};

export default NextAuth(authOptions);
