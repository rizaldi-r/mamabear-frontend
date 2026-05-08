import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { decodeJwt } from "jose";
import { API_BASE_URL } from "@/lib/config";

/**
 * refreshAccessToken
 * Logic to use the Refresh Token to get a new Access Token.
 */
async function refreshAccessToken(token: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: token.refreshToken }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) throw refreshedTokens;

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      // Reset the timer (assume 1 hour lifespan for new access token)
      accessTokenExpires: Date.now() + 60 * 60 * 1000, 
    };
  } catch (error) {
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

/**
 * NextAuth Configuration
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          });

          const response = await res.json();

          // Matches the Success Response (201 Created) in api_contract.md
          if (res.ok && response.success && response.data) {
            const { accessToken, refreshToken } = response.data;

            /**
             * Since the backend doesn't send the user object in the response body,
             * we decode the JWT to get the user's profile data (id, email, name, role).
             */
            // NOTE: name is not in the jwt
            const decoded = decodeJwt(accessToken) as any;

            return {
              id: decoded.sub || decoded.id,
              name: decoded.name || "User",
              email: decoded.email,
              role: decoded.role || "USER",
              accessToken,
              refreshToken,
            };
          }
          return null;
        } catch (error) {
          console.error("[NextAuth Authorize Error]:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        return {
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          id: user.id,
          role: user.role,
          // Set expiry (Current time + 1 hour)
          accessTokenExpires: Date.now() + 60 * 60 * 1000,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.error = token.error as string;
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // Standard 1-day session
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
