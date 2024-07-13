import { db } from '@/db';
import { projectTable } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import { ProjectList } from './project-list';
import { eq } from 'drizzle-orm';

export default async function Home() {
  const { userId } = auth();

  if (!userId) {
    return // TODO: return to sign in page, if this is moved into somewhere
    // else, check that userId is never empty
    // -> maybe move userId to own file for that
  }

  const projects = await db.select().from(projectTable).where(eq(projectTable.userId, userId));

  return <ProjectList projects={projects} />;
}
