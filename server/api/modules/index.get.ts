export default defineEventHandler(async () => {
  const db = useDrizzle()
  const modules = await db.select({
    id: tables.modules.id,
    name: tables.modules.name,
    repo: tables.modules.repo,
    type: tables.modules.type,
    icon: tables.modules.icon,
    slug: tables.modules.slug,
  }).from(tables.modules)
  return modules
})
