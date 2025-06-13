import { z } from "zod";

export const createFiscalNotesSchema = z.object({
  id: z.string().optional(),
  receiptDate: z.coerce.date(),
  arrivalTime: z.string().min(1, {
    message: "Preencha o campo com a hora de chegada",
  }),
  orderNumber: z.string().min(1, {
    message: "Preencha o campo com o número do pedido",
  }),
  invoiceNumber: z.string().min(1, {
    message: "Preencha o campo com o número da nota fiscal",
  }),
  invoiceSeries: z.string().min(1, {
    message: "Preencha o campo com o número de série",
  }),
  companyName: z.string().min(1, {
    message: "Preencha o campo com a razão social",
  }),
  issueDate: z.coerce.date(),
  dueDate1: z.coerce.date().optional(),
  dueDate2: z.coerce.date().optional(),
  dueDate3: z.coerce.date().optional(),
  carrierName: z.string().optional(),
  vehiclePlate: z.string().optional(),
  driverName: z.string().optional(),
  driverDocument: z.string().optional(),
  exitNoteNumber: z.string().optional(),
  exitTime: z.string().optional(),
});

export type FiscalNotesTransaction = z.infer<typeof createFiscalNotesSchema>;
