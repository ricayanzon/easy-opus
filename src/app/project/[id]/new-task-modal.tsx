"use client";

import { useClickOutside } from "@/hooks";
import { useEffect, useState, type FormEvent, type ChangeEvent, useRef } from "react";

interface NewTaskModalProps {
  onSubmit: (title: string, description: string) => Promise<void>;
  onClose: () => void;
}

// TODO: this component shares a lot with NewProjectModal -> abstract into own parent component and inject content
export function NewTaskModal({ onSubmit, onClose }: NewTaskModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isValidTask, setIsValidTask] = useState(false)

  const modalRef = useRef<HTMLDivElement>(null)
  useClickOutside(modalRef, onClose)

  useEffect(() => {
    const isValidTitle = title.trim().length > 0
    const isValidDescription = description.trim().length > 0
    setIsValidTask(isValidTitle && isValidDescription)
  }, [title, description])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isValidTask) {
      await onSubmit(title, description);
    }
  }

  const onTitleInput = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)
  const onDescriptionInput = (event: ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center px-4">
      <div className="relative w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-4 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out"
        >
          &times;
        </button>
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Add Task</h2>
          <div>
            <label
              htmlFor="title"
              className="text-sm font-medium text-gray-600"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              onInput={onTitleInput}
              className="mt-2 block w-full px-4 py-3 bg-gray-50 rounded-md border-transparent focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-600"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              onInput={onDescriptionInput}
              className="mt-2 block w-full px-4 py-3 bg-gray-50 rounded-md border-transparent focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={!isValidTask}
            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}
