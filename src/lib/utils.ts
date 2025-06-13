import { getUserByUsername } from "@/data/user";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string) {
  return text
    .normalize("NFD") // separa acentos das letras
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/[^a-zA-Z0-9]/g, "") // remove caracteres especiais
    .toLowerCase();
}

export async function generateUniqueUsername(
  firstName: string,
  lastName: string
) {
  const baseUsername =
    `${slugify(firstName)}.${slugify(lastName)}`.replace(/^\.|\.$/, "") ||
    "user";

  let username = baseUsername;
  let count = 1;

  while (await getUserByUsername(username)) {
    username = `${baseUsername}${count}`;
    count++;
  }

  return username;
}
