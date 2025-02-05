import { fetchRepositories } from "@/components/actions/repository-action";
import { ReadRepositoriesResponse } from "@/app/openapi-client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RepositoriesTable } from "./repositoriesTable";

export default async function RepositoriesPage() {
  const repositories = (await fetchRepositories()) as ReadRepositoriesResponse;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">My repositories</h2>
      <p className="text-lg mb-6">
        Here, you can see the overview of your repositories and manage them.
      </p>

      <div className="mb-6">
        <Link href="/repositories/add-repository">
          <Button variant="outline" className="text-lg px-4 py-2">
            Add New Repository
          </Button>
        </Link>
      </div>

      {/* Pass the fetched data to our Client Component */}
      <RepositoriesTable repositories={repositories} />
    </div>
  );
}