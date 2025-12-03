import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";


export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  //callback, page are required for further customization


  /*
  callbacks: {
    async jwt({ token, user, account }) {
      // Runs on sign-in AND on every request


      // On first login, `user` is defined → we can look up DB user
      if (user) {
        // Example: get role from DB by email
        // const dbUser = await getUserFromDB(user.email!);
        // token.role = dbUser.role ?? "user";

        // For now, hard-code role example:
        token.role = user.email === "admin@example.com" ? "admin" : "user";
      }

      return token;
    }, 
    async session({ session, token }) {
      // Expose role into session.user
      if (session.user && token.role) {
        (session.user as any).role = token.role;
      }
      return session;
    }, */
 
}
const handler = NextAuth(authOptions);
  
export { handler as GET, handler as POST };