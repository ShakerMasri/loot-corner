// src/server/auth/config.ts

import { type DefaultSession, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { loginSchema } from "~/lib/validations";

import { db } from "~/server/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id?: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}

export const authConfig = {
  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      authorize: async (credentials) => {
        const result = loginSchema.safeParse(credentials);

        if (!result.success) {
          return null;
        }

        const { email, password } = result.data;

        const user = await db.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          return null;
        }

        if (!user.passwordHash) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(password, user.passwordHash);

        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        if (user.id) {
          token.id = user.id;
        }

        token.role = user.role;
      }

      return token;
    },

    session({ session, token }) {
      if (session.user) {
        if (token.id) {
          session.user.id = token.id;
        }

        if (token.role) {
          session.user.role = token.role;
        }
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;
