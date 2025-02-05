import React, { useEffect, useState } from "react";
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
    <>

        <div className="bg-gray-50 py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Sources</h1>
                <div className="mt-2 flex flex-col sm:flex-row sm:space-x-8 text-sm text-gray-600">
                  <span className="mt-2 flex items-center">
                    Here, you can see the overview of your sources and manage them.
                  </span>
                </div>
              </div>
              <div className="mt-5 flex space-x-3">
                <Link href="/sources/add-source">
                  <Button variant="outline" className="text-lg px-4 py-2">
                    Add New Source
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      {/* Separator Line */}
      <div className="border-t border-gray-300 mx-8" />
        {/* Main Content Wrapper: Fills Remaining Space */}
        <main className="flex-1 py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6">
              {/* Full width Section: Sources Table */}
              <section aria-labelledby="sources-table-title">
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h2
                      id="sources-table-title"
                      className="text-lg font-medium text-gray-900"
                    >
                      Sources Overview
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      A complete list of your sources.
                    </p>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
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
                              className="cursor-pointer hover:bg-gray-50"
                            >
                              <TableCell>{source.name}</TableCell>
                              <TableCell>{source.description}</TableCell>
                              <TableCell>
                                {source.last_updated
                                  ? new Date(source.last_updated).toLocaleString()
                                  : "N/A"}
                              </TableCell>
                              <TableCell className="text-center">
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
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
    </>
  );
}