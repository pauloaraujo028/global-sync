"use client";

import { ConfirmDialog } from "@/components/confirm-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useFiscalNotes } from "../_context/fiscal-notes-context";
import { deleteFiscalNotes } from "../_data/actions";
import { TasksImportDialog } from "./fiscal-notes-import-dialog";
import { FiscalNotesMutateDrawer } from "./fiscal-notes-mutate-drawer";

export function FiscalNotesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useFiscalNotes();

  const router = useRouter();

  return (
    <>
      <FiscalNotesMutateDrawer
        key="task-create"
        open={open === "create"}
        onOpenChange={() => setOpen("create")}
      />

      <TasksImportDialog
        key="tasks-import"
        open={open === "import"}
        onOpenChange={() => setOpen("import")}
      />

      {currentRow && (
        <>
          <FiscalNotesMutateDrawer
            key={`task-update-${currentRow.invoiceNumber}`}
            open={open === "update"}
            onOpenChange={() => {
              setOpen("update");
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            currentRow={currentRow}
          />

          <ConfirmDialog
            key="task-delete"
            destructive
            open={open === "delete"}
            onOpenChange={() => {
              setOpen("delete");
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            handleConfirm={async () => {
              setOpen(null);
              if (currentRow.id) {
                const res = await deleteFiscalNotes(currentRow.id);
                if (res.success) {
                  toast.success("NF excluída com sucesso!");
                  router.refresh();
                } else {
                  toast.error("Erro ao excluir NF.");
                }
              } else {
                toast.error("Erro: ID da NF não encontrado.");
              }
              // setTimeout(() => {
              //   setCurrentRow(null);
              // }, 500);
              toast("A seguinte NF foi excluída:", {
                description: (
                  <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                      {JSON.stringify(currentRow, null, 2)}
                    </code>
                  </pre>
                ),
              });
            }}
            className="max-w-md"
            title={`Excluir esta NF: ${currentRow.invoiceNumber} ?`}
            desc={
              <>
                Você está prestes a excluir uma NF com o ID <br />
                <strong>{currentRow.invoiceNumber}</strong>. Esta ação não
                poderá ser desfeita.
              </>
            }
            confirmText="Deletar"
          />
        </>
      )}
    </>
  );
}
