import { ContentLayout } from "@/components/admin-panel/content-layout";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { FiscalNotesDialogs } from "./_components/fiscal-notes-dialogs";
import { FiscalNotesPrimaryButtons } from "./_components/fiscal-notes-primary-buttons";
import FiscalNotesProvider from "./_context/fiscal-notes-context";
import { getFiscalNotes } from "./_data/actions";

export default async function FiscalNotePage() {
  const fiscalNotes = (await getFiscalNotes()).map((fiscalNote) => ({
    ...fiscalNote,
    dueDate1: fiscalNote.dueDate1 ?? undefined,
    dueDate2: fiscalNote.dueDate2 ?? undefined,
    dueDate3: fiscalNote.dueDate3 ?? undefined,
    carrierName: fiscalNote.carrierName ?? undefined,
    vehiclePlate: fiscalNote.vehiclePlate ?? undefined,
    driverName: fiscalNote.driverName ?? undefined,
    driverDocument: fiscalNote.driverDocument ?? undefined,
    exitNoteNumber: fiscalNote.exitNoteNumber ?? undefined,
    exitTime: fiscalNote.exitTime ?? undefined,
  }));

  return (
    <FiscalNotesProvider>
      <ContentLayout title="Controle de Notas">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-x-4 space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Entrada e Saída de Notas
            </h2>
            <p className="text-muted-foreground">
              Gerencie as notas de entrada e saída.
            </p>
          </div>
          <FiscalNotesPrimaryButtons />
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <DataTable data={fiscalNotes} columns={columns} />
        </div>
      </ContentLayout>

      <FiscalNotesDialogs />
    </FiscalNotesProvider>
  );
}
