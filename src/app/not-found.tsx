"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFoundError() {
  const router = useRouter();

  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] font-bold leading-tight">404</h1>
        <span className="font-medium">Oops! Página não encontrada!</span>
        <p className="text-center text-muted-foreground">
          Parece que a página que você está procurando <br />
          não existe ou pode ter sido removido.
        </p>
        <div className="mt-6 flex gap-4">
          <Button onClick={() => router.back()} variant="outline">
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
}
