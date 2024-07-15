import { updateTask } from "@/db/actions";
import { Status, Task as TaskType } from "@/types";
import { MouseEvent, useState } from "react";
import { EditTask } from "./edit-task";
import { useRouter } from "next/navigation";
import { ImBin } from "react-icons/im";

interface TaskProps {
  initialTask: TaskType
  onDelete: (taskId: number) => Promise<void>
}

export function Task({ initialTask, onDelete }: TaskProps) {
  const [task, setTask] = useState(initialTask)
  const [isEditMode, setIsEditMode] = useState(false)

  const router = useRouter()

  const handleUpdateTask = async (taskId: number, title: string, description: string, status: Status) => {
    setTask({
      id: taskId,
      title,
      description,
      status
    })
    setIsEditMode(false)
    router.refresh()
    await updateTask(taskId, title, description, status)
  }

  const openEditMode = () => {
    if (!isEditMode) {
      setIsEditMode(true)
    }
  }

  const handleDelete = (event: MouseEvent) => {
    event.stopPropagation()
    onDelete(task.id)
  }

  return (
    <div className="flex gap-3 mb-4">
      <div
        onClick={openEditMode}
        className={
          `flex flex-grow flex-col bg-white p-4 rounded-lg border border-b-gray-300 shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out ${isEditMode ? 'cursor-auto' : 'cursor-pointer'}`
        }>
        {
          isEditMode
            ? <EditTask
                task={task}
                onSubmit={handleUpdateTask}
                onClose={() => setIsEditMode(false)}/>
            : <>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{task.title}</h3>
                <p className="text-gray-600 mb-4">{task.description}</p>
                <p className="text-sm text-blue-500">{task.status}</p>
              </>
        }
      </div>
      <button
        onClick={handleDelete}
        className="text-red-500 hover:text-red-600 font-bold transition duration-200 ease-in-out">
          <ImBin size="1.25rem" />
      </button>
    </div>
  );
}
