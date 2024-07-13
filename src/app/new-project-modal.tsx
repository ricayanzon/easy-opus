"use client";

import { useEffect, useState, type FormEvent, type ChangeEvent } from "react";

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
  const [name, setName] = useState('')
  const [isValidName, setIsValidName] = useState(false)

  useEffect(() => {
    const trimmedName = name.trim()
    setIsValidName(trimmedName.length > 0)
  }, [name])

  const onInput = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)
  const handleSubmit = async (event: FormEvent<ProjectFormElement>) => {
    event.preventDefault();
    if (isValidName) {
      const trimmedName = name.trim()
      await onSubmit(trimmedName);
    }
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
              value={name}
              type="text"
              id="name"
              name="name"
              onInput={onInput}
              className="mt-2 block w-full px-4 py-3 bg-gray-50 rounded-md border-transparent focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={!isValidName}
            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
}
