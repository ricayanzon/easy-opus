'use server';

import { db } from '.';
import { projectTable, taskTable } from './schema';

export async function insertProject(userId: string, name: string) {
  // TODO: this should fail if name or userId are empty strings
  await db.insert(projectTable).values({ userId, name });
}

export async function insertTask(title: string, description: string, projectId: number) {
  // TODO: this should fail if title or description are empty strings, or if projectId doesnt match any project
  await db.insert(taskTable).values({ title, description, status: 'inprogress', projectId });
}