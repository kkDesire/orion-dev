import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(
    event,
    z.object(
      { hash: z.string().length(12) },
    ).parse,
  )

  const { hash } = params

  const template = await useDrizzle()
    .select({
      id: tables.templates.id,
      title: tables.templates.title,
      description: tables.templates.description,
      status: tables.templates.status,
      paidStatus: tables.templates.paidStatus,
      liveUrl: tables.templates.liveUrl,
      accessUrl: tables.templates.accessUrl,
      user: {
        name: tables.users.name,
        login: tables.users.login,
        avatarUrl: tables.users.avatarUrl,
      },
      category: {
        /**
         * The `name` field is aliased to `c_name` to avoid
         * conflicts with the `name` field from the `tamplate` table. Issue in D1
         *
         * https://github.com/cloudflare/workers-sdk/issues/3160
         */
        name: sql<string>`${tables.categories.name}`.as('c_name'),
      },
    })
    .from(tables.templates)
    .where(eq(tables.templates.hash, hash))
    .leftJoin(tables.users, eq(tables.templates.userId, tables.users.id))
    .leftJoin(tables.categories, eq(tables.templates.categoryId, tables.categories.id))
    .get()
  return template
})
