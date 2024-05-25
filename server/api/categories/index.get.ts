export default defineEventHandler(async () => {
  const db = useDrizzle()
  const categories = await db.select({
    id: tables.categories.id,
    name: tables.categories.name,
    slug: tables.categories.slug,
  }).from(tables.categories)
  return categories
})
