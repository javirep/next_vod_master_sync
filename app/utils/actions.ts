/* "use server";

import { createSession, deleteSession } from "./session";
import { redirect } from "next/navigation";
import { UserRepository } from "@/database/repositories/UserRepository";
import { compareHashes, hashPassword } from "@/utils/hashes";

type LoginData = {
    email: string;
    password: string;
};

export async function login (data: LoginData) {

  const { email, password } = data;
  const dbUser = await UserRepository.findOne({ where: { email } });

   if ( !dbUser || !dbUser.password || !dbUser.email) {
    return {
      success: false,
      error: "Invalid email or password",
    };
  }

  const isCorrectPassword = await compareHashes(password, dbUser.password);

  if (!isCorrectPassword) {
    return {
      success: false,
      error: "Invalid email or password",
    }
  }

  await createSession(dbUser.id);

  return {
    success: true,
    data: dbUser
  }
}

export async function logout() {
  await deleteSession();
  redirect("/login");
} */