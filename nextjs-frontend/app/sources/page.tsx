import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { DeleteButton } from "./deleteButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchSources } from "@/components/actions/sources-action";
import { ReadSourcesResponse } from "@/app/openapi-client";

export default async function SourcesPage() {
  const sources = (await fetchSources()) as ReadSourcesResponse;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">My sources</h2>
      <p className="text-lg mb-6">
        Here, you can see the overview of your sources and manage them.
      </p>

      <div className="mb-6">
        <Link href="/sources/add-source">
          <Button variant="outline" className="text-lg px-4 py-2">
            Add New Source
          </Button>
        </Link>
      </div>

      <section className="p-6 bg-white rounded-lg shadow-lg mt-8">
        <Table className="min-w-full text-sm">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[150px]">Last Updated</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!sources.length ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No results.
                </TableCell>
              </TableRow>
            ) : (
              sources.map((source) => (
                <TableRow
                  key={source.id}
                  // Make the entire row clickable
                  className="cursor-pointer hover:bg-gray-50"
                >
                  <TableCell>{source.name}</TableCell>
                  <TableCell>{source.description}</TableCell>
                  <TableCell>
                    {source.last_updated
                      ? new Date(source.last_updated).toLocaleString()
                      : "N/A"}
                  </TableCell>
                  <TableCell
                    className="text-center"
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger className="cursor-pointer p-1 text-gray-600 hover:text-gray-800">
                        <span className="text-lg font-semibold">...</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="p-2">
                        <DropdownMenuItem disabled>Edit</DropdownMenuItem>
                        <DeleteButton sourceId={source.id} />
                      </DropdownMenuContent>
                    </DropdownMenu>
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