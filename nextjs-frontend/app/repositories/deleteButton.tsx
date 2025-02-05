"use client";

import { removeRepository } from "@/components/actions/repository-action";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface DeleteButtonProps {
  repositoryId: string;
}

export function DeleteButton({ repositoryId }: DeleteButtonProps) {
  const handleDelete = async () => {
    await removeRepository(repositoryId);
  };

  return (
    <DropdownMenuItem
      className="text-red-500 cursor-pointer"
      onClick={handleDelete}
    >
      Delete
    </DropdownMenuItem>
  );
}
