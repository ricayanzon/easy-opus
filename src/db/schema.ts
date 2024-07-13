import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const projectTable = pgTable('project', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const taskTable = pgTable('task', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  status: text('status').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  projectId: integer('project_id')
    .notNull()
    .references(() => projectTable.id),
});