import { ApiCollections } from "@/api-collection";
import NextAuth, {User, Session} from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  type Session = Session & ApiCollections["directus_users"];
  type User = User & ApiCollections["directus_users"];
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  type JWT = JWT & ApiCollections["directus_users"];
}
