import { ContentLayout } from "@/components/admin-panel/content-layout";
import { getUsers } from "@/server/actions/users";
import { columns } from "./_components/users-columns";
import { UsersDialogs } from "./_components/users-dialogs";
import { UsersPrimaryButtons } from "./_components/users-primary-buttons";
import { UsersTable } from "./_components/users-table";
import UsersProvider from "./_context/users-context";

export default async function UsersPage() {
  const userList = (await getUsers()).map((user) => ({
    ...user,
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    username: user.username ?? "",
  }));

  return (
    <UsersProvider>
      <ContentLayout title="Usuários">
        <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Lista de Usuários
            </h2>
            <p className="text-muted-foreground">
              Gerencie seus usuários e suas funções aqui.
            </p>
          </div>
          <UsersPrimaryButtons />
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <UsersTable data={userList} columns={columns} />
        </div>
      </ContentLayout>

      <UsersDialogs />
    </UsersProvider>
  );
}
