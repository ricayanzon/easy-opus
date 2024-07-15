'use client'

import { deleteTask, insertTask } from "@/db/actions";
import { Task as TaskType } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { NewTaskModal } from "./new-task-modal";
import { Task } from "./task";

interface TaskListProps {
  projectId: number,
  tasks: TaskType[],
}

export function TaskList({ projectId, tasks }: TaskListProps) {
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  const router = useRouter();

  const handleNewTask = async (title: string, description: string) => {
    await insertTask(title, description, projectId);
    setShowNewTaskModal(false);
    router.refresh();
  }

  const onDeleteTask = async (taskId: number) => {
    await deleteTask(taskId)
    router.refresh()
  }

  return (
    <div className="my-8 mx-auto w-full max-w-2xl">
      <button
        onClick={() => setShowNewTaskModal(true)}
        className="mb-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow hover:shadow-md transition duration-200 ease-in-out"
      >
        Add New Task
      </button>
      <div className="my-8 mx-auto w-full max-w-2xl">
        {tasks.length > 0
          ? tasks.map((task) => (
              <Task
                key={task.id}
                initialTask={task}
                onDelete={onDeleteTask} />
            ))
          : <h1>No tasks found for this project. Add your first task to see it here.</h1>}
      </div>
      {showNewTaskModal && (
        <NewTaskModal onSubmit={handleNewTask} onClose={() => setShowNewTaskModal(false)} />
      )}
    </div>
  );
}