export default defineEventHandler(async () => {
  const db = useDrizzle()

  const templates = await db.select().from(tables.templates)
  const populatedTemplate = await Promise.all(
    templates.map(async (template) => {
      const category = await db
        .select({ name: tables.categories.name })
        .from(tables.categories)
        .where(eq(tables.categories.id, template.categoryId))
        .get()
      const user = await db
        .select().from(tables.users)
        .where(eq(tables.users.id, template.userId))
        .get()
      return {
        ...template,
        category,
        user,
      }
    }),
  )

  return populatedTemplate
})
