import { z } from "zod";

const userStatusSchema = z.union([
  z.literal("ACTIVE"),
  z.literal("INACTIVE"),
  z.literal("INVITED"),
  z.literal("SUSPENDED"),
]);
export type UserStatus = z.infer<typeof userStatusSchema>;

const userRoleSchema = z.union([z.literal("ADMIN"), z.literal("USER")]);

const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string(),
  status: userStatusSchema,
  role: userRoleSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type User = z.infer<typeof userSchema>;

export const userListSchema = z.array(userSchema);

export const createUserSchema = z
  .object({
    id: z.string().optional(),
    firstName: z.string().min(1, { message: "Nome é obrigatório." }),
    lastName: z.string().min(1, { message: "Sobrenome é obrigatório." }),
    username: z
      .string()
      .min(1, { message: "Username is required." })
      .optional(),
    email: z
      .string()
      .min(1, { message: "E-mail é obrigatório." })
      .email({ message: "E-mail inválido." }),
    role: z.string().min(1, { message: "Cargo é obrigatório." }),
    status: userStatusSchema,
    password: z.string().transform((pwd) => pwd.trim()),
    confirmPassword: z.string().transform((pwd) => pwd.trim()),
    isEdit: z.boolean(),
  })
  .superRefine(({ isEdit, password, confirmPassword }, ctx) => {
    if (!isEdit || (isEdit && password !== "")) {
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
          message: "Senha deve ter pelo menos 4 caracteres.",
          path: ["password"],
        });
      }

      if (password !== confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Senhas não conferem.",
          path: ["confirmPassword"],
        });
      }
    }
  });
