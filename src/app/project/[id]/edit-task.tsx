import { Status, Task } from "@/types";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { StatusDropdown } from "./status-dropdown";
import { useRouter } from "next/navigation";

interface EditTaskProps {
  task: Task
  onSubmit: (taskId: number, title: string, description: string, status: Status) => Promise<void>
  onClose: () => void;
}

export function EditTask({ task, onSubmit, onClose }: EditTaskProps) {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [status, setStatus] = useState<Status>(task.status)
  const [isValidTask, setIsValidTask] = useState(true)
  const [hasChanged, setHasChanged] = useState(false)

  const onTitleInput = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)
  const onDescriptionInput = (event: ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)
  const onStatusChange = (value: Status) => setStatus(value)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (isValidTask && hasChanged) {
      await onSubmit(task.id, title.trim(), description.trim(), status)
    }
  }

  useEffect(() => {
    const trimmedTitle = title.trim()
    const trimmedDescription = description.trim()

    const isValidTitle = trimmedTitle.length > 0
    const isValidDescription = trimmedDescription.length > 0
    setIsValidTask(isValidTitle && isValidDescription)
    
    const hasTitleChanged = task.title !== trimmedTitle
    const hasDescriptionChanged = task.description !== trimmedDescription
    const hasStatusChanged = task.status !== status
    setHasChanged(hasTitleChanged || hasDescriptionChanged || hasStatusChanged)
  }, [task, title, description, status])

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onInput={onTitleInput}
        className="mt-2 block w-full px-4 py-3 bg-gray-50 rounded-md border-transparent"/>
      <input
        type="text"
        id="description"
        name="description"
        value={description}
        onInput={onDescriptionInput}
        className="mt-2 block w-full px-4 py-3 bg-gray-50 rounded-md border-transparent"/>
      <div className="flex justify-between">
        <StatusDropdown currentStatus={status} onChange={onStatusChange}/>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="text-white bg-gray-500 hover:bg-gray-600 font-bold py-2 px-4 rounded shadow hover:shadow-md transition duration-200 ease-in-out">
            &times;
          </button>
          <button
            type="submit"
            disabled={!isValidTask || !hasChanged}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow hover:shadow-md transition duration-200 ease-in-out disabled:bg-gray-200">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}