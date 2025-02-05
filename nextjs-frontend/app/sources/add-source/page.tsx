"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addSource } from "@/components/actions/sources-action"; // Assuming a similar action exists
import { useActionState } from "react";
import { SubmitButton } from "@/components/ui/submitButton";

const initialState = { message: "" };

export default function CreateSourcePage() {
  const [state, dispatch] = useActionState(addSource, initialState);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
            Create New Source
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Enter the details of the new source below.
          </p>
        </header>

        <form
          action={dispatch}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6"
        >
          <div className="space-y-6">
            <div className="space-y-3">
              <Label
                htmlFor="name"
                className="text-gray-700 dark:text-gray-300"
              >
                Source Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Source name"
                required
                className="w-full border-gray-300 dark:border-gray-600"
              />
              {state.errors?.name && (
                <p className="text-red-500 text-sm">{state.errors.name}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="description"
                className="text-gray-700 dark:text-gray-300"
              >
                Source Description
              </Label>
              <Input
                id="description"
                name="description"
                type="text"
                placeholder="Description of the source"
                required
                className="w-full border-gray-300 dark:border-gray-600"
              />
              {state.errors?.description && (
                <p className="text-red-500 text-sm">
                  {state.errors.description}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="link"
                className="text-gray-700 dark:text-gray-300"
              >
                Source Link
              </Label>
              <Input
                id="link"
                name="link"
                type="url"
                placeholder="URL of the source"
                required
                className="w-full border-gray-300 dark:border-gray-600"
              />
              {state.errors?.link && (
                <p className="text-red-500 text-sm">{state.errors.link}</p>
              )}
            </div>
          </div>

          <SubmitButton text="Create Source" />

          {state?.message && (
            <div className="mt-2 text-center text-sm text-red-500">
              <p>{state.message}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
} 