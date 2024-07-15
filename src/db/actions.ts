'use server';

import { Status } from '@/types';
import { db } from '.';
import { projectTable, taskTable } from './schema';
import { and, eq } from 'drizzle-orm';

export async function insertProject(userId: string, name: string) {
  if (userId.length !== 0 && name.length !== 0) {
    await db.insert(projectTable).values({ userId, name });
  }
}

export async function deleteProject(userId: string, projectId: number) {
  await db.delete(projectTable).where(
    and(
      eq(projectTable.userId, userId),
      eq(projectTable.id, projectId)
    ))
}

export async function insertTask(title: string, description: string, projectId: number) {
  // TODO: this fails if projectId doesnt match any project
  if (title.length !== 0 && description.length !== 0) {
    await db.insert(taskTable).values({ title, description, status: 'inprogress', projectId });
  }
}

export async function updateTask(taskId: number, title?: string, description?: string, status?: Status) {
  // TODO: this fails if task with taskId does not exist
  if ((title && title.length !== 0) || (description && description.length !== 0) || status) {
    await db.update(taskTable).set({ title, description, status }).where(eq(taskTable.id, taskId))
  }
}

export async function deleteTask(taskId: number) {
  await db.delete(taskTable).where(eq(taskTable.id, taskId))
}