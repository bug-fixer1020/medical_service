import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/app/lib/db";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "PLACEHOLDER",
      clientSecret: process.env.GOOGLE_SECRET || "PLACEHOLDER",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID || "PLACEHOLDER",
      clientSecret: process.env.FACEBOOK_SECRET || "PLACEHOLDER",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const usersCollection = await db("users");
        const user = await usersCollection.findOne({ email: credentials.email });

        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return {
            id: user._id.toString(),
            name: user.fullName || user.name,
            email: user.email,
            role: user.role,
          };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google" || account.provider === "facebook") {
        const usersCollection = await db("users");

        const existingUser = await usersCollection.findOne({ email: user.email });
        if (!existingUser) {
          // Create new social user with default role
          const result = await usersCollection.insertOne({
            name: user.name,
            email: user.email,
            image: user.image,
            role: "user", // Default role for social signup
            provider: account.provider,
            createdAt: new Date(),
          });
          user.id = result.insertedId.toString();
          user.role = "user";
        } else {
          user.id = existingUser._id.toString();
          user.role = existingUser.role;
          user.fullname = existingUser.name;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.fullname = user.fullname;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = session.user || {};
        session.user.id = token.id;
        session.user.fullname = token.fullname;
        session.user.role = token.role;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

