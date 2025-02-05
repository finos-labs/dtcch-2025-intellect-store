import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import { fetchRepositories} from "@/components/actions/repository-action";
import { DeleteButton } from "./deleteButton";
import { ReadRepositoryResponse } from "@/app/openapi-client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function RepositoriesPage() {
  const repositories = (await fetchRepositories()) as ReadRepositoryResponse;

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

      <section className="p-6 bg-white rounded-lg shadow-lg mt-8">
        <Table className="min-w-full text-sm">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-center">Link</TableHead>
              <TableHead className="text-center">Pull Request</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!repositories.length ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No results.
                </TableCell>
              </TableRow>
            ) : (
              repositories.map((repository, index) => (
                <TableRow key={index}>
                  <TableCell>{repository.name}</TableCell>
                  <TableCell>{repository.description}</TableCell>
                  <TableCell className="text-center">
                    <a
                      href={repository.link}
                      className="text-blue-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {repository.link}
                    </a>
                  </TableCell>
                  <TableCell className="text-center">
                    {repository.pull_request_link ? (
                      <button
                        onClick={() =>
                          window.open(
                            repository.pull_request_link!,
                            "_blank",
                            "noopener,noreferrer"
                          )
                        }
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded"
                      >
                        View PR
                      </button>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
