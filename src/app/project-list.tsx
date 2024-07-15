'use client';

import { insertProject, deleteProject } from "@/db/actions";
import { Project as ProjectType } from "@/types";
import { useRouter } from "next/navigation";
import { NewProjectModal } from "./new-project-modal";
import { useState } from 'react'
import { Project } from "./project";

interface ProjectListProps {
  userId: string,
  projects: ProjectType[]
}

export function ProjectList({ userId, projects }: ProjectListProps) {
  const router = useRouter()

  const [showModal, setShowModal] = useState(false);

  const onCreateProject = async (name: string) => {
    await insertProject(userId, name);
    setShowModal(false);
    router.refresh();
  }

  const onDeleteProject = async (projectId: number) => {
    await deleteProject(userId, projectId)
    router.refresh()
  }

  return (
    <div className="my-8 mx-auto w-full max-w-2xl">
      <button
        onClick={() => setShowModal(true)}
        className="mb-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow hover:shadow-md transition duration-200 ease-in-out"
      >
        Add New Project
      </button>
      
      <div className="my-8 mx-auto w-full max-w-2xl">
        {projects.map((project) => (
          <Project
            key={project.id}
            project={project}
            onDelete={onDeleteProject} />
        ))}
      </div>

      {showModal && (
        <NewProjectModal onSubmit={onCreateProject} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}