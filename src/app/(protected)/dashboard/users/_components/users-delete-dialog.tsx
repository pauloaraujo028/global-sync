"use client";

import { ConfirmDialog } from "@/components/confirm-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { deleteUser } from "@/app/(protected)/dashboard/users/_data/actions";
import { User } from "@/app/(protected)/dashboard/users/_data/schema";
import { TriangleAlert } from "lucide-react";
import { startTransition, useState } from "react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: User;
}

export function UsersDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const [value, setValue] = useState("");

  const handleDelete = () => {
    if (value.trim() !== currentRow.username) return;

    startTransition(() => {
      deleteUser(currentRow.id)
        .then((res) => {
          if (!res.success) {
            toast.error("Erro ao deletar usuário");
            return;
          }

          onOpenChange(false);
          toast("Usuário deletado com sucesso", {
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                  {JSON.stringify(currentRow, null, 2)}
                </code>
              </pre>
            ),
          });
        })
        .catch(() => toast.error("Erro ao deletar usuário"));
    });
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.username}
      title={
        <span className="text-destructive">
          <TriangleAlert
            className="mr-1 inline-block stroke-destructive"
            size={18}
          />
          Deletar usuário
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Tem certeza de que deseja excluir o usuário
            <span className="font-bold"> {currentRow.username}</span>?
            <br />
            Esta ação removerá permanentemente o usuário com a função de
            <span className="font-bold"> {currentRow.role.toUpperCase()} </span>
            do sistema. Isso não poderá ser desfeito.
          </p>

          <Label className="my-2">
            Username:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Digite o nome de usuário para confirmar a exclusão."
            />
          </Label>

          <Alert variant="destructive">
            <AlertTitle>Aviso!</AlertTitle>
            <AlertDescription>
              Tenha cuidado, esta operação não poderá ser revertida.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText="Deletar"
      destructive
    />
  );
}
