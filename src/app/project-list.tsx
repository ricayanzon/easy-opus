import { Project } from "@/types/projects";

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="my-8 mx-auto w-full max-w-2xl">
      {projects.map((project) => (
        <div
          key={project.id}
          className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow duration-200 ease-in-out">
          <span className="text-lg font-semibold text-gray-800 hover:text-blue-500 transition-colors duration-150 ease-in-out">
            {project.name}
          </span>
        </div>
      ))}
    </div>
  );
}