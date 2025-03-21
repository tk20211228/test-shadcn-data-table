import Image from "next/image";
import { getTasks } from "./actions";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { UserNav } from "./components/user-nav";
import Link from "next/link";
import { HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const { tasks, totalTaskLength } = await getTasks();
  return (
    <main className="container mx-auto">
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex mt-10">
        <Button variant="outline" size="icon" asChild>
          <Link href="/">
            <HomeIcon className="h-6 w-6" />
          </Link>
        </Button>
        <DataTable
          data={tasks}
          columns={columns}
          totalTaskLength={totalTaskLength}
        />
      </div>
    </main>
  );
}
