import { UserRole, UserStatus } from "@prisma/client";
import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  status: UserStatus;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
