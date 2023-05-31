import { components, ApiCollections } from "@/api-collection";
import directus from "@/lib/directus";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Kullanıcı Bilgileri",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@smithco.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await directus.auth.login({
          email: credentials!.username,
          password: credentials!.password,
        });

        if (res) {
          const directusUser = await directus.users.me.read(
            {fields:[
              "*",
              "role.*",
              "avatar.*",
              "active_tenant.*",
              "active_tenant.logo.*",
              "active_company.*",
              "active_company.logo.*"
            ]}
          );
          return directusUser as ApiCollections["directus_users"]; 
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session({session,token,user}){
        return session
    },
    jwt({token,user,account}){
        token.user = user as components["schemas"]["Users"];
        return token;
    },
    async signIn({ user, account, profile, email, credentials }) {
        if (user) {
          return true
        } else {
          // Return false to display a default error message
          return false
          // Or you can return a URL to redirect to:
          // return '/unauthorized'
        }
      }
  },
});

export { handler as GET, handler as POST };
