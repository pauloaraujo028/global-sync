"use client";

import { Navbar } from "@/components/admin-panel/navbar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { useCurrentRole } from "@/hooks/use-current-role";
import Link from "next/link";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  const role = useCurrentRole();

  return (
    <div>
      <Navbar title={title} />

      <div className="w-full pt-4 pb-8 px-4 sm:px-8">
        <Breadcrumb>
          <BreadcrumbList>
            {role === "ADMIN" ? (
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem>Home</BreadcrumbItem>
            )}
            <BreadcrumbSeparator />
            {role === "ADMIN" ? (
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem>Dashboard</BreadcrumbItem>
            )}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Card className="rounded-lg border-none mt-4">
          <CardContent className="p-6">
            <div className="flex flex-col min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
              {children}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
