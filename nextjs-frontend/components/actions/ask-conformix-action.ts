"use server";

import { cookies } from "next/headers";
import { readRepositories, deleteRepository, createRepository, readRepository, askConformix } from "@/app/clientService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { repositorySchema } from "@/lib/definitions";


export async function askConformixRequest(query: string, repositoryId: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { message: "No access token found" };
  }

  const input = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: {
      query,
      repository_id: repositoryId,
    },
  };

  const { error } = await askConformix(input);
  if (error) {
    return { message: `${error.detail}` };
  }
}

export async function fetchRepository(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { message: "No access token found" };
  }

  const { data, error } = await readRepository({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    path: {
      repository_id: id,
    },
  });

  if (error) {
    return { message: error };
  }

  return data;
}