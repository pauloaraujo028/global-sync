import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  file: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, {
      message: "Por favor, carregue um arquivo",
    })
    .refine(
      (files) => ["text/csv"].includes(files?.[0]?.type),
      "Por favor, carregue no formato csv."
    ),
});

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TasksImportDialog({ open, onOpenChange }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { file: undefined },
  });

  const fileRef = form.register("file");

  const onSubmit = () => {
    const file = form.getValues("file");

    if (file && file[0]) {
      const fileDetails = {
        name: file[0].name,
        size: file[0].size,
        type: file[0].type,
      };
      toast("Você importou o seguinte arquivo:", {
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(fileDetails, null, 2)}
            </code>
          </pre>
        ),
      });
    }
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        onOpenChange(val);
        form.reset();
      }}
    >
      <DialogContent className="gap-2 sm:max-w-sm">
        <DialogHeader className="text-left">
          <DialogTitle>Tarefas de importação</DialogTitle>
          <DialogDescription>
            Importe tarefas rapidamente de um arquivo CSV.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form id="task-import-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="file"
              render={() => (
                <FormItem className="mb-2 space-y-1">
                  <FormLabel>Arquivo</FormLabel>
                  <FormControl>
                    <Input type="file" {...fileRef} className="h-8" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className="gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button variant="outline">Fechar</Button>
          </DialogClose>
          <Button type="submit" form="task-import-form">
            Importar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
