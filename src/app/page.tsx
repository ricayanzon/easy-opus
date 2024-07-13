import { db } from '@/db';
import { projectTable } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import { SignIn } from '@clerk/nextjs';
import { ProjectList } from './project-list';
import { eq } from 'drizzle-orm';


export default async function Home() {
  const { userId } = auth();

  if (!userId) {
    // TODO: return to sign in page, if this is moved into somewhere
    // else, check that userId is never empty
    // -> maybe move userId to own file for that
    return (
      <div className="flex justify-center items-center h-screen">
        <SignIn />
      </div>
    );
  }

  const projects = await db.select().from(projectTable).where(eq(projectTable.userId, userId));

  return <ProjectList userId={userId} projects={projects} />;
}
