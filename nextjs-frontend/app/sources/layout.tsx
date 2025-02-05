import { PageHeading } from "@/components/ui/page-heading";
import { NavBar } from "@/components/ui/nav-bar";
import { Home, List } from "lucide-react";

export default function RepositoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <NavBar/>
      <main className="ml-16 w-full p-8 bg-muted/40">
        <PageHeading 
          breadcrumbs={[
            { label: "Home", path: "/", icon: <Home className="h-4 w-4" /> },
            { label: "Sources", path: "/sources", icon: <List className="h-4 w-4" /> }
          ]}
          userInitial="U"
        />
        <section className="grid gap-6">{children}</section>
      </main>
    </div>
  );
}
