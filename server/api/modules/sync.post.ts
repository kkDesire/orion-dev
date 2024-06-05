export interface Modules {
  modules: { name: string, repo: string, type: 'official' | 'community', icon: string }[]
}
export default defineEventHandler(async (event) => {
  await requireAdminUser(event)

  const data = await $fetch<Modules>('https://api.nuxt.com/modules')

  const modules = data.modules
    .filter(({ type }) => type === 'official' || type === 'community')
    .map(({ name, type, icon, repo }) => ({ name, type, icon, repo, slug: useSlugify(name) })).filter(module => module.type === 'official' || module.type === 'community')

  const columnsPerModule = Object.keys(modules[0]).length
  const insertPerLoop = Math.floor(100 / columnsPerModule)
  const loops = Math.ceil(modules.length / insertPerLoop)

  for (let loop = 0; loop < loops; loop++) {
    const values = modules.slice(loop * insertPerLoop, (loop + 1) * insertPerLoop)
    await useDrizzle()
      .insert(tables.modules)
      .values(values)
      .onConflictDoNothing({ target: tables.modules.repo }).execute()
  }

  return sendNoContent(event, 204)
})
