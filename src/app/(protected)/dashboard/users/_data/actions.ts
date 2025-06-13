"use server";

import { getUserByEmail, getUserByUsername } from "@/data/user";
import { db } from "@/lib/prisma";
import { generateUniqueUsername } from "@/lib/utils";
import { UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createUserSchema } from "./schema";

export const createUser = async (data: z.infer<typeof createUserSchema>) => {
  try {
    const validatedFields = createUserSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        error: "Falha ao criar a conta, verifique os dados digitados",
      };
    }

    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      username: rawUsername,
    } = validatedFields.data;

    if (password !== confirmPassword) {
      return {
        error: "As senhas não conferem",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return {
        error: "Usuário já existe",
      };
    }

    const lowercaseEmail = email.toLowerCase();

    const username =
      rawUsername && rawUsername.trim() !== ""
        ? rawUsername.trim()
        : await generateUniqueUsername(firstName, lastName);

    const existingUsername = await getUserByUsername(username);

    if (existingUsername) {
      return {
        error: "Usuário já existe",
      };
    }

    // coloca o username com numero incremental
    // const username = await generateUniqueUsername(firstName, lastName);

    // para bloquear o username caso o username já exista
    // const username = `${slugify(firstName)}.${slugify(lastName)}`;

    // const existingUsername = await getUserByUsername(username || "");

    // if (existingUsername) {
    //   return {
    //     error: "Usuário já existe",
    //   };
    // }

    await db.user.create({
      data: {
        firstName,
        lastName,
        email: lowercaseEmail,
        password: hashedPassword,
        username: username,
      },
    });

    revalidatePath("/users");

    return {
      success: "Cadastro realizado com sucesso",
    };
  } catch {
    return {
      error: "Erro ao cadastrar usuário, tente novamente mais tarde",
    };
  }
};

export const updateUser = async (data: z.infer<typeof createUserSchema>) => {
  try {
    const validatedFields = createUserSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        error: "Falha ao editar o usuário, verifique os dados digitados",
      };
    }

    const {
      id,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      role,
      username: rawUsername,
    } = validatedFields.data;

    if (!id) {
      return { error: "ID do usuário não fornecido" };
    }

    const userExists = await db.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      return { error: "Usuário não encontrado" };
    }

    // Verifica se a senha foi enviada para alterar
    let updatedPassword = undefined;

    if (password) {
      if (password !== confirmPassword) {
        return {
          error: "As senhas não conferem",
        };
      }

      updatedPassword = await bcrypt.hash(password, 10);
    }

    const lowercaseEmail = email.toLowerCase();

    let usernameToUpdate = userExists.username;

    if (rawUsername && rawUsername.trim() !== userExists.username) {
      const newUsername = rawUsername.trim();

      if (newUsername !== "") {
        const existingUsername = await getUserByUsername(newUsername);

        if (existingUsername && existingUsername.id !== id) {
          return {
            error: "Nome de usuário já em uso",
          };
        }

        usernameToUpdate = newUsername;
      }
    }

    await db.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
        username: usernameToUpdate,
        email: lowercaseEmail,
        role: role as UserRole,
        ...(updatedPassword && { password: updatedPassword }),
      },
    });

    revalidatePath("/users");

    return {
      success: "Usuário atualizado com sucesso",
    };
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return {
      error: "Erro ao atualizar usuário, tente novamente mais tarde",
    };
  }
};

export async function deleteUser(id: string) {
  try {
    await db.user.delete({
      where: { id },
    });

    revalidatePath("/users");

    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    return { success: false, error: "Erro ao deletar usuário" };
  }
}
