import {createAuthClient} from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
})

export const {signIn, signUp, signOut, useSession} = authClient;
export type TSession = typeof authClient.$Infer.Session
export type TUser = typeof authClient.$Infer.Session.user