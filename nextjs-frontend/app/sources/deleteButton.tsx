"use client";

import { removeSource } from "@/components/actions/sources-action";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface DeleteButtonProps {
  sourceId: string;
}

export function DeleteButton({ sourceId }: DeleteButtonProps) {
  const handleDelete = async () => {
    await removeSource(sourceId);
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
