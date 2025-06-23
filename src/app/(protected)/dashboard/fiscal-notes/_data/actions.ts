"use server";

import { currentUser } from "@/data/auth";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createFiscalNotesSchema } from "./schema";

export const getFiscalNotes = async () => {
  try {
    const transactions = await db.fiscalNotes.findMany({
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
    return transactions;
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    return [];
  }
};

export const createFiscalNotes = async (
  data: z.infer<typeof createFiscalNotesSchema>
) => {
  const parsed = createFiscalNotesSchema.safeParse(data);
  console.log(data);

  if (!parsed.success) {
    console.log(parsed.error.format());
    return {
      error: "Falha ao criar NF, verifique os dados digitados",
    };
  }

  const user = await currentUser();

  if (!user || !user.id) {
    return {
      error: "Usuário não autenticado.",
    };
  }

  const { ...rest } = parsed.data;

  try {
    await db.fiscalNotes.create({
      data: {
        ...rest,
        userId: user.id,
      },
    });

    revalidatePath("/invoices");
    return {
      success: "NF cadastrada com sucesso",
    };
  } catch (error) {
    console.error("Erro ao criar NF:", error);
    return {
      error: "Erro ao cadastrar NF, tente novamente mais tarde",
    };
  }
};

export const updateFiscalNotes = async (
  data: z.infer<typeof createFiscalNotesSchema>
) => {
  try {
    const validatedFields = createFiscalNotesSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        error: "Falha ao editar a NF, verifique os dados digitados",
      };
    }

    const {
      id,
      arrivalTime,
      companyName,
      invoiceNumber,
      invoiceSeries,
      issueDate,
      orderNumber,
      receiptDate,
      carrierName,
      driverDocument,
      driverName,
      dueDate1,
      dueDate2,
      dueDate3,
      exitNoteNumber,
      exitTime,
      vehiclePlate,
    } = validatedFields.data;

    if (!id) {
      return {
        error: "Erro ao atualizar a NF, tente novamente mais tarde.",
      };
    }

    await db.fiscalNotes.update({
      where: { id },
      data: {
        arrivalTime,
        companyName,
        invoiceNumber,
        invoiceSeries,
        issueDate,
        orderNumber,
        receiptDate,
        carrierName,
        driverDocument,
        driverName,
        dueDate1,
        dueDate2,
        dueDate3,
        exitNoteNumber,
        exitTime,
        vehiclePlate,
      },
    });

    revalidatePath("/invoices");

    return {
      success: "NF atualizada com sucesso.",
    };
  } catch (error) {
    console.error("Erro ao atualizar NF:", error);
    return { error: "Erro ao atualizar a NF, tente novamente mais tarde." };
  }
};

export const deleteFiscalNotes = async (id: string) => {
  try {
    await db.fiscalNotes.delete({
      where: { id },
    });

    revalidatePath("/invoices");
    return { success: true, message: " NF deletada com sucesso." };
  } catch (error) {
    console.error("Erro ao deletar NF:", error);
    return { success: false, message: "Erro ao deletar NF." };
  }
};

export const deleteFiscalNotesBatch = async (ids: string[]) => {
  try {
    await db.fiscalNotes.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    revalidatePath("/invoices");
    return { success: true, message: "NF deletadas com sucesso." };
  } catch (error) {
    console.error("Erro ao deletar NF:", error);
    return { success: false, message: "Erro ao deletar NF." };
  }
};
