import { UserRole } from "@prisma/client";
import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Digite um e-mail válido",
  }),
  password: z.string().min(1, {
    message: "A senha é obrigatória",
  }),
});

export const registerSchema = z
  .object({
    username: z.optional(z.string()),
    firstName: z.string().min(1, {
      message: "O nome é obrigatório",
    }),
    lastName: z.string().min(1, {
      message: "O nome é obrigatório",
    }),
    email: z.string().email({
      message: "Digite um e-mail válido",
    }),
    password: z.string().transform((pwd) => pwd.trim()),
    confirmPassword: z.string().transform((pwd) => pwd.trim()),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Senha é obrigatória.",
        path: ["password"],
      });
    }

    if (password.length < 4) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Senha deve ter pelo menos 6 caracteres.",
        path: ["password"],
      });
    }

    // if (!password.match(/[a-z]/)) {
    //   ctx.addIssue({
    //     code: z.ZodIssueCode.custom,
    //     message: "Senha deve conter pelo menos uma letra minúscula.",
    //     path: ["password"],
    //   });
    // }

    // if (!password.match(/\d/)) {
    //   ctx.addIssue({
    //     code: z.ZodIssueCode.custom,
    //     message: "Senha deve conter pelo menos um número.",
    //     path: ["password"],
    //   });
    // }

    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Senhas não conferem.",
        path: ["confirmPassword"],
      });
    }
  });

export const settingsSchema = z
  .object({
    name: z.optional(z.string()),
    email: z.optional(
      z.string().email({
        message: "Digite um e-mail válido",
      })
    ),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    password: z.optional(z.string().min(4)),
    newPassword: z.optional(z.string().min(4)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "A nova senha é obrigatória",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "A senha é obrigatória",
      path: ["password"],
    }
  );
