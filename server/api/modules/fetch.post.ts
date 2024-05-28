export interface Modules {
  modules: { name: string, repo: string, type: 'official' | 'community', icon: string }[]
}
export default defineEventHandler(async (event) => {
  await requireAdminUser(event)

  const db = useDrizzle()

  const data = await $fetch<Modules>('https://api.nuxt.com/modules')

  const modules = data.modules.map(({ name, type, icon, repo }) => ({ name, type, icon, repo })).filter(module => module.type === 'official' || module.type === 'community')

  const keys = Object.keys(modules).length
  const maximumInsert = Math.floor(100 / keys)
  const times = Math.ceil(modules.length / maximumInsert)

  for (let i = 0; i < times; i++) {
    const values = modules.slice(i * maximumInsert, (i + 1) * maximumInsert)
    await db.insert(tables.modules).values(values).onConflictDoNothing({ target: tables.modules.repo })
  }

  return sendNoContent(event, 204)
})
