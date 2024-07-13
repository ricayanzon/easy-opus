import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const projectTable = pgTable('project', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});