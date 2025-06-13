"use client";

import useDialogState from "@/hooks/use-dialog-state";
import React, { useState } from "react";
import { FiscalNotesTransaction } from "../_data/schema";

type FiscalNotesDialogType =
  | "create"
  | "update"
  | "delete"
  | "import"
  | "delete-batch";

interface FiscalNotesContextType {
  open: FiscalNotesDialogType | null;
  setOpen: (str: FiscalNotesDialogType | null) => void;
  currentRow: FiscalNotesTransaction | null;
  setCurrentRow: React.Dispatch<
    React.SetStateAction<FiscalNotesTransaction | null>
  >;
  selectedRows: FiscalNotesTransaction[];
  setSelectedRows: React.Dispatch<
    React.SetStateAction<FiscalNotesTransaction[]>
  >;
}

const FiscalNotesContext = React.createContext<FiscalNotesContextType | null>(
  null
);

interface Props {
  children: React.ReactNode;
}

export default function InvoicesProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<FiscalNotesDialogType>(null);
  const [currentRow, setCurrentRow] = useState<FiscalNotesTransaction | null>(
    null
  );
  const [selectedRows, setSelectedRows] = useState<FiscalNotesTransaction[]>(
    []
  );

  return (
    <FiscalNotesContext.Provider
      value={{
        open,
        setOpen,
        currentRow,
        setCurrentRow,
        selectedRows,
        setSelectedRows,
      }}
    >
      {children}
    </FiscalNotesContext.Provider>
  );
}

export const useFiscalNotes = () => {
  const fiscalNotesContext = React.useContext(FiscalNotesContext);

  if (!fiscalNotesContext) {
    throw new Error("useTasks has to be used within <FiscalNotesContext>");
  }

  return fiscalNotesContext;
};
