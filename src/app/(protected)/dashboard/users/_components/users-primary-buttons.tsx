"use client";

import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";
import { useUsers } from "../_context/users-context";

export function UsersPrimaryButtons() {
  const { setOpen } = useUsers();

  return (
    <div className="flex gap-2">
      <Button className="space-x-1" onClick={() => setOpen("add")}>
        <span>Adicionar usuário</span> <UserRoundPlus size={18} />
      </Button>
    </div>
  );
}
