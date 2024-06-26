import { relations } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { PAID_STATUS, ROLE_TYPE, STATUS } from '../../utils/constants'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  githubId: integer('github_id').notNull().unique(),
  email: text('email').notNull().unique(),
  login: text('login').notNull().unique(),
  name: text('name'),
  avatarUrl: text('avatar_url').notNull(),
  roleType: text('role_type', { enum: ROLE_TYPE }).default('creator'),
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
  slug: text('slug').notNull().unique(),
  name: text('name').notNull().unique(),
  repo: text('repo').notNull().unique(),
  type: text('type', { enum: ['official', 'community'] }).notNull(),
  icon: text('icon'),
  createdAt: text('created_at').notNull().$defaultFn(() => sql`(current_timestamp)`),
  updatedAt: text('updated_at').notNull().$defaultFn(() => sql`(current_timestamp)`).$onUpdateFn(() => sql`(current_timestamp)`),
})

export const templates = sqliteTable('templates', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  hash: text('hash').notNull().unique(),
  slug: text('slug').notNull(),
  title: text('title').notNull(),
  status: text('status', { enum: STATUS }).notNull().default('submitted'),
  paidStatus: text('paid_status', { enum: PAID_STATUS }).notNull().default('free'),
  liveUrl: text('live_url'),
  accessUrl: text('access_url').notNull(),
  shortDescription: text('short_description').notNull(),
  description: text('description'),
  creatorId: integer('creator_id').notNull().references(() => users.id),
  categoryId: integer('category_id').notNull().references(() => categories.id),
  createdAt: text('created_at').notNull().$defaultFn(() => sql`(current_timestamp)`),
  updatedAt: text('updated_at').notNull().$defaultFn(() => sql`(current_timestamp)`).$onUpdateFn(() => sql`(current_timestamp)`),
})

export const usersRelation = relations(users, ({ many }) => ({
  templates: many(templates),
}))

export const categoriesRelation = relations(categories, ({ many }) => ({
  templates: many(modules),
}))

export const modulesToTemplates = sqliteTable('modules_to_templates', {
  moduleId: integer('module_id').notNull().references(() => modules.id),
  templateId: integer('template_id').notNull().references(() => templates.id),
})

export const templateRelation = relations(templates, ({ one, many }) => ({
  creator: one(users, {
    fields: [templates.creatorId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [templates.categoryId],
    references: [categories.id],
  }),
  module: many(modulesToTemplates),
}))

export const modulesTotemplatesRelation = relations(modulesToTemplates, ({ one }) => ({
  module: one(modules, {
    fields: [modulesToTemplates.moduleId],
    references: [modules.id],
  }),
  template: one(templates, {
    fields: [modulesToTemplates.templateId],
    references: [templates.id],
  }),
}))

// export const moduleRelation = relations(modules, ({ many }) => ({
//   modulesToTemplates: many(modulesToTemplates),
// }))
