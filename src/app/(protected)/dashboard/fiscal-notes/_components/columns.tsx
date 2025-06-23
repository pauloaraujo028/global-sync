"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { FiscalNotesTransaction } from "../_data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<FiscalNotesTransaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "receiptDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data Recebimento" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("receiptDate") as Date;
      const formattedDate = date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      return <div className="w-fit text-nowrap">{formattedDate}</div>;
    },
    filterFn: (row, columnId, filterValue) => {
      const rawValue = row.getValue(columnId);
      if (!rawValue) return false;

      const rowDate = new Date(rawValue as string).toISOString().split("T")[0]; // yyyy-mm-dd
      return rowDate === filterValue;
    },
  },
  {
    accessorKey: "arrivalTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hora Chegada" />
    ),
    cell: ({ row }) => {
      const hour = row.getValue("arrivalTime") as string;

      return <div className="w-fit text-nowrap">{hour || "-"}</div>;
    },
  },
  {
    accessorKey: "orderNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nº Pedido" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("orderNumber")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "invoiceNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nº NF Entrada" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("invoiceNumber")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "invoiceSeries",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nº Série" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("invoiceSeries")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "companyName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Razão Social" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
          {row.getValue("companyName")}
        </span>
      );
    },
  },
  {
    accessorKey: "issueDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data Emissão" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("issueDate") as Date;
      const formattedDate = date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      return <div className="w-fit text-nowrap">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "dueDate1",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="1ª Parc. Vencimento" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("dueDate1") as Date | undefined | null;

      if (!date) return <div className="w-fit text-nowrap">-</div>;

      const formattedDate = date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      return <div className="w-fit text-nowrap">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "dueDate2",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="2ª Parc. Vencimento" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("dueDate2") as Date | undefined | null;

      if (!date) return <div className="w-fit text-nowrap">-</div>;

      const formattedDate = date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      return <div className="w-fit text-nowrap">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "dueDate3",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="3ª Parc. Vencimento" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("dueDate3") as Date | undefined | null;

      if (!date) return <div className="w-fit text-nowrap">-</div>;

      const formattedDate = date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      return <div className="w-fit text-nowrap">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "carrierName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome Transportadora" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
          {row.getValue("carrierName")}
        </span>
      );
    },
  },
  {
    accessorKey: "vehiclePlate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Placa Veículo" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
          {row.getValue("vehiclePlate")}
        </span>
      );
    },
  },
  {
    accessorKey: "driverName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome Motorista" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
          {row.getValue("driverName")}
        </span>
      );
    },
  },
  {
    accessorKey: "driverDocument",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CPF/RG Motorista" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
          {row.getValue("driverDocument")}
        </span>
      );
    },
  },
  {
    accessorKey: "exitNoteNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nº Nota Saída" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
          {row.getValue("exitNoteNumber")}
        </span>
      );
    },
  },
  {
    accessorKey: "exitTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hora Saída" />
    ),
    cell: ({ row }) => {
      const hour = row.getValue("exitTime") as string;

      return <div className="w-fit text-nowrap">{hour || "-"}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Criado em" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      const formattedDate = date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      return <div className="w-fit text-nowrap">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Editado em" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("updatedAt") as Date;
      const formattedDate = date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      return <div className="w-fit text-nowrap">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "user.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Usuário" />
    ),
    cell: ({ row }) => {
      const user = row.original.user;
      return (
        <span className="max-w-32 truncate font-medium">
          {user?.username ?? "-"}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
