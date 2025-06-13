"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createFiscalNotes, updateFiscalNotes } from "../_data/actions";
import {
  FiscalNotesTransaction,
  createFiscalNotesSchema,
} from "../_data/schema";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow?: FiscalNotesTransaction;
}

export function FiscalNotesMutateDrawer({
  open,
  onOpenChange,
  currentRow,
}: Props) {
  const isUpdate = !!currentRow;

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof createFiscalNotesSchema>>({
    resolver: zodResolver(createFiscalNotesSchema),
    defaultValues: currentRow ?? {
      receiptDate: new Date(),
      arrivalTime: "",
      orderNumber: "",
      invoiceNumber: "",
      invoiceSeries: "",
      companyName: "",
      issueDate: new Date(),
      // dueDate1: null,
      // dueDate2: null,
      // dueDate3: null,
      // carrierName: undefined,
      // vehiclePlate: undefined,
      // driverName: undefined,
      // driverDocument: undefined,
      // exitNoteNumber: undefined,
      // exitTime: undefined,
    },
  });

  const action = isUpdate ? updateFiscalNotes : createFiscalNotes;

  const onSubmit = (values: z.infer<typeof createFiscalNotesSchema>) => {
    startTransition(() => {
      action(values).then((res) => {
        if (res.error) {
          toast.error(res.error);
          return;
        }
        if (res.success) {
          form.reset();
          toast("You submitted the following values:", {
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                  {JSON.stringify(values, null, 2)}
                </code>
              </pre>
            ),
          });
          onOpenChange(false);
        }
      });
    });
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v && !isUpdate) form.reset();
      }}
    >
      <SheetContent className="flex flex-col overflow-y-auto">
        <SheetHeader className="text-left">
          <SheetTitle>
            {isUpdate ? "Editar" : "Adicionar"} Nota Fiscal
          </SheetTitle>
          <SheetDescription>
            {isUpdate
              ? "Atualize a nota fiscal fornecendo as informações necessárias."
              : "Adicione uma nova nota fiscal fornecendo as informações necessárias. "}
            Clique em salvar quando terminar.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            id="tasks-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 space-y-5"
          >
            <FormField
              control={form.control}
              name="receiptDate"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Data Recebimento</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Preencha com a data de recebimento"
                      type="date"
                      value={field.value?.toISOString().split("T")[0] || ""}
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="arrivalTime"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Hora Chegada</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Preencha com a hora da chegada"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="orderNumber"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>N° Pedido</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Preencha com o número do pedido"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="invoiceNumber"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>N° NF Entrada</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Preencha com o número da nota fiscal"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="invoiceSeries"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>N° Série</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Preencha com o número da série"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Razão Social</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Preencha com a razão social"
                      value={field.value?.toUpperCase() || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="issueDate"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Data Emissão</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Preencha com a data de emissão"
                      type="date"
                      value={field.value?.toISOString().split("T")[0] || ""}
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate1"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>1° Parc. Vencimento</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      value={
                        field.value
                          ? new Date(field.value).toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? new Date(e.target.value) : null
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate2"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>2° Parc. Vencimento</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      value={
                        field.value
                          ? new Date(field.value).toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? new Date(e.target.value) : null
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate3"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>3° Parc. Vencimento</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      value={
                        field.value
                          ? new Date(field.value).toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? new Date(e.target.value) : null
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="carrierName"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Nome Transportadora</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Preencha com o nome da transportadora"
                      value={field.value?.toUpperCase() || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vehiclePlate"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Placa Veículo</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Preencha com a placa do veículo"
                      value={field.value?.toUpperCase() || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="driverName"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Nome Motorista</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Preencha com o nome do motorista"
                      value={field.value?.toUpperCase() || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="driverDocument"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>RG / CPF</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Preencha com o RG ou CPF do motorista"
                      value={field.value?.toUpperCase() || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="exitNoteNumber"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>NF Saída</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Preencha com o número da NF de saída"
                      value={field.value?.toUpperCase() || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="exitTime"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Hora Saída</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Preencha com a hora de saída"
                      value={field.value?.toUpperCase() || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <SheetFooter className="gap-2">
          <SheetClose asChild>
            <Button variant="outline">Fechar</Button>
          </SheetClose>
          <Button form="tasks-form" type="submit" disabled={isPending}>
            {isPending ? (
              <span className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Carregando
              </span>
            ) : isUpdate ? (
              "Salvar alterações"
            ) : (
              "Criar usuário"
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
