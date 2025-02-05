"use server";

import { cookies } from "next/headers";
import { readRepository, deleteRepository, createRepository } from "@/app/clientService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { repositorySchema } from "@/lib/definitions";

export async function fetchRepositories() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { message: "No access token found" };
  }

  const { data, error } = await readRepository({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (error) {
    return { message: error };
  }

  return data;
}

export async function removeRepository(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { message: "No access token found" };
  }

  const { error } = await deleteRepository({
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
  revalidatePath("/repositories");
}

export async function addRepository(prevState: {}, formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { message: "No access token found" };
  }

  // Include pull_request_link in the object to be validated.
  const validatedFields = repositorySchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    link: formData.get("link"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  // Destructure all fields, including pull_request_link
  const { name, description, link } = validatedFields.data;

  const input = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: {
      name,
      description,
      link,
      pull_request_link: null,
    },
  };

  const { error } = await createRepository(input);
  if (error) {
    return { message: `${error.detail}` };
  }
  redirect(`/repositories`);
}