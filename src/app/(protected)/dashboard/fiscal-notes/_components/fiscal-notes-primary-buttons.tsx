"use client";

import { Button } from "@/components/ui/button";
import { useCurrentRole } from "@/hooks/use-current-role";
import { Download, Plus } from "lucide-react";
import { useFiscalNotes } from "../_context/fiscal-notes-context";

export function FiscalNotesPrimaryButtons() {
  const { setOpen } = useFiscalNotes();
  const role = useCurrentRole();

  return (
    <div className="flex gap-2">
      {role === "ADMIN" && (
        <Button
          variant="outline"
          className="space-x-1"
          onClick={() => setOpen("import")}
        >
          <span>Importar</span> <Download size={18} />
        </Button>
      )}
      <Button className="space-x-1" onClick={() => setOpen("create")}>
        <span>Adicionar</span> <Plus size={18} />
      </Button>
    </div>
  );
}
