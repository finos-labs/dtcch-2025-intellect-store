"use server";

import { cookies } from "next/headers";
import { readSources, deleteSource, createSource } from "@/app/clientService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sourceSchema } from "@/lib/definitions";

export async function fetchSources() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { message: "No access token found" };
  }

  const { data, error } = await readSources({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (error) {
    return { message: error };
  }

  return data;
}

export async function removeSource(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { message: "No access token found" };
  }

  const { error } = await deleteSource({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    path: {
      source_id: id,
    },
  });

  if (error) {
    return { message: error };
  }
  revalidatePath("/dashboard");
}

export async function addSource(prevState: {}, formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { message: "No access token found" };
  }

  const validatedFields = sourceSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    link: formData.get("link"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { name, description,link } = validatedFields.data;

  const input = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: {
      name,
      description,
      link,
      last_updated: null,
    },
  };
  const { error } = await createSource(input);
  if (error) {
    return { message: `${error.detail}` };
  }
  redirect(`/sources`);
}
