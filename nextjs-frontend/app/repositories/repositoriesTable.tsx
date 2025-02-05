"use client";

import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import { ReadRepositoriesResponse } from "@/app/openapi-client";

export function RepositoriesTable({
  repositories,
}: {
  repositories: ReadRepositoriesResponse;
}) {
  const router = useRouter();

  return (
    <section className="p-6 bg-white rounded-lg shadow-lg">
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
            repositories.map((repository) => (
              // Make the entire row clickable
              <TableRow
                key={repository.id}
                onClick={() => router.push(`/repositories/${repository.id}`)}
                // Optional: show a pointer and hover background to indicate the row is clickable
                className="cursor-pointer hover:bg-gray-50 transition-colors"
              >
                {/* Display the repository name as plain text */}
                <TableCell>{repository.name}</TableCell>

                <TableCell>{repository.description}</TableCell>

                <TableCell className="text-center">
                  <a
                    href={repository.link}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()} 
                    // Stop row's onClick from also firing
                  >
                    {repository.link}
                  </a>
                </TableCell>

                <TableCell className="text-center">
                  {repository.pull_request_link ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // prevent row click as well
                        window.open(
                          repository.pull_request_link!,
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }}
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
  );
}