import { relations } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  githubId: integer('github_id').notNull().unique(),
  email: text('email').notNull().unique(),
  login: text('login').notNull().unique(),
  name: text('name'),
  avatarUrl: text('avatar_url').notNull(),
  roleType: text('role_type', { enum: ['admin', 'creator'] }).default('creator'),
  createdAt: text('created_at').notNull().$defaultFn(() => sql`(current_timestamp)`),
  updatedAt: text('updated_at').notNull().$defaultFn(() => sql`(current_timestamp)`).$onUpdateFn(() => sql`(current_timestamp)`),
})

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  createdAt: text('created_at').notNull().$defaultFn(() => sql`(current_timestamp)`),
  updatedAt: text('updated_at').notNull().$defaultFn(() => sql`(current_timestamp)`).$onUpdateFn(() => sql`(current_timestamp)`),
})

export const modules = sqliteTable('modules', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  repo: text('repo').notNull().unique(),
  type: text('type', { enum: ['official', 'community'] }).notNull(),
  icon: text('icon'),
  createdAt: text('created_at').notNull().$defaultFn(() => sql`(current_timestamp)`),
  updatedAt: text('updated_at').notNull().$defaultFn(() => sql`(current_timestamp)`).$onUpdateFn(() => sql`(current_timestamp)`),
})

export const templates = sqliteTable('templates', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  hash: text('name').notNull().unique(),
  slug: text('slug').notNull(),
  title: text('title').notNull(),
  /**
   * Submitted: when a user submits a template
   * Refused: when a user's template is refused by an admin
   * Validate: when a user's template is validated by an admin and visible by everyone
   */
  status: text('status', { enum: ['submitted', 'refused', 'validate'] }).notNull(),
  paidStatus: text('paid_status', { enum: ['free', 'paid'] }).notNull().default('free'),
  liveUrl: text('live_url'),
  accessUrl: text('access_url').notNull(),
  description: text('description').notNull(),
  userId: integer('user_id').references(() => users.id),
  categoryId: integer('category_id').references(() => categories.id),
  createdAt: text('created_at').notNull().$defaultFn(() => sql`(current_timestamp)`),
  updatedAt: text('updated_at').notNull().$defaultFn(() => sql`(current_timestamp)`).$onUpdateFn(() => sql`(current_timestamp)`),
})

export const usersRelation = relations(users, ({ many }) => ({
  templates: many(templates),
}))

export const categoryRelation = relations(categories, ({ many }) => ({
  templates: many(modules),
}))
