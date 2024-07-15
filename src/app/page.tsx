import { db } from '@/db';
import { projectTable } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import { SignIn } from '@clerk/nextjs';
import { ProjectList } from './project-list';
import { eq } from 'drizzle-orm';


export default async function Home() {
  const { userId } = auth();

  if (!userId) {
    return (
      <div className="flex justify-center items-center h-screen">
        <SignIn />
      </div>
    );
  }

  const projects = await db.select().from(projectTable).where(eq(projectTable.userId, userId));

  if (projects.length > 0) {
    return <ProjectList userId={userId} projects={projects} />;
  }

  return <h1>No projects found, add your first to see it here.</h1>
}
