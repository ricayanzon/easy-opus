"use client";

import * as React from "react";

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
}

interface ProjectFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export function NewProjectModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (name: string) => Promise<void>;
}) {
  async function handleSubmit(event: React.FormEvent<ProjectFormElement>) {
    event.preventDefault();
    const name = event.currentTarget.elements.name.value.trim();
    await onSubmit(name);
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center px-4">
      <div className="relative w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-4 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out"
        >
          &times;
        </button>
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Add Project</h2>
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-600">
              Project Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-2 block w-full px-4 py-3 bg-gray-50 rounded-md border-transparent focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
}
