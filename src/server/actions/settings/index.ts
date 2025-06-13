"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { settingsSchema } from "@/schemas/auth";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const settings = async (values: z.infer<typeof settingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return {
      error: "Unauthorized",
    };
  }

  if (!user.id) {
    return {
      error: "User ID is undefined",
    };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return {
      error: "Unauthorized",
    };
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return {
        error: "Email já está em uso!",
      };
    }
  }

  if (values.password && values.newPassword && dbUser.password) {
    const isPasswordValid = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!isPasswordValid) {
      return {
        error: "Senha incorreta!",
      };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      ...values,
    },
  });

  return {
    success: "Dados atualizados com sucesso!",
  };
};
