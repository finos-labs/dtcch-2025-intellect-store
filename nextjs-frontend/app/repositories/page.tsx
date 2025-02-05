import { fetchRepositories } from "@/components/actions/repository-action";
import { ReadRepositoriesResponse } from "@/app/openapi-client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RepositoriesTable } from "./repositoriesTable";

export default async function RepositoriesPage() {
  const repositories = (await fetchRepositories()) as ReadRepositoriesResponse;

  return (
    <>
  {/* Page Header */}
  <div className="bg-gray-50 py-8">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Repositories</h1>
          <div className="mt-2 flex flex-col sm:flex-row sm:space-x-8 text-sm text-gray-600">
            <span className="mt-2 flex items-center">
              Here, you can see the overview of your repositories and manage them.
            </span>
          </div>
        </div>
        <div className="mt-5 flex space-x-3">
          <Link href="/repositories/add-repository">
            <Button variant="outline" className="text-lg px-4 py-2">
              Add New Repository
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </div>

  {/* Separator Line */}
  <div className="border-t border-gray-300 mx-8" />

  {/* Main Content Wrapper */}
  <main className="flex-1 py-10">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6">
        {/* Full width Section: Repositories Table */}
        <section aria-labelledby="repositories-table-title">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2
                id="repositories-table-title"
                className="text-lg font-medium text-gray-900"
              >
                Repositories Overview
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                A complete list of your repositories.
              </p>
            </div>
            <div className="">
              <RepositoriesTable repositories={repositories} />
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
</>
  );
}