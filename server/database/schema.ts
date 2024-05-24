import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  githubId: integer('github_id').notNull().unique(),
  username: text('username').notNull(),
  avatarUrl: text('avatar_url').notNull(),
})
