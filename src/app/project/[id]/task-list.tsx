'use client'

import { insertTask } from "@/db/actions";
import { Task } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NewTaskModal } from "./new-task-modal";

interface TaskListProps {
  projectId: number,
  tasks: Task[],
}

export function TaskList({ projectId, tasks }: TaskListProps) {
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  const router = useRouter();

  async function handleNewTask(title: string, description: string) {
    
    await insertTask(title, description, projectId);
    setShowNewTaskModal(false);
    router.refresh();
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
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex flex-col bg-white p-4 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow duration-200 ease-in-out"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{task.title}</h3>
            <p className="text-gray-600 mb-4">{task.description}</p>
            <p className="text-sm text-blue-500">{task.status}</p>
          </div>
        ))}
      </div>
      {showNewTaskModal && (
        <NewTaskModal onSubmit={handleNewTask} onClose={() => setShowNewTaskModal(false)} />
      )}
    </div>
  );
}