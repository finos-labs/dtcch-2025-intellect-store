import { fetchRepository } from "@/components/actions/repository-action";
import { notFound } from "next/navigation";
import { ReadRepositoryResponse } from "@/app/openapi-client";
import RepositoryLayout from "./RepositoryLayout";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function RepositoryPage({ params }: PageProps) {
  const repository = (await fetchRepository(params.id)) as ReadRepositoryResponse;

  if (!repository || "message" in repository) {
    notFound();
  }

  return <RepositoryLayout repository={repository} />;
}