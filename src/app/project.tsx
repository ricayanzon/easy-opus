import { type Project } from "@/types"
import { useRouter } from "next/navigation"
import { ImBin } from "react-icons/im";

interface ProjectProps {
  project: Project
  onDelete: (projectId: number) => Promise<void>
}

export function Project({ project, onDelete }: ProjectProps) {
  const router = useRouter()

  const redirectToProject = () => router.push(`/project/${project.id}`)

  return (
    <div
      key={project.id}
      className="flex items-center gap-3 mb-4">
      <div className="flex-grow bg-white rounded-lg border border-b-gray-300 shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out">
        <button
          onClick={redirectToProject}
          className="w-full p-4 text-lg font-semibold text-gray-800 hover:text-blue-500 transition-colors duration-150 ease-in-out">
          {project.name}
        </button>
      </div>
      <button
        onClick={() => onDelete(project.id)}
        className="bg-white text-red-500 hover:text-red-600 font-bold transition duration-200 ease-in-out">
          <ImBin size="1.25rem" />
      </button>
    </div>
  );
}