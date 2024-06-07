export default defineEventHandler(async () => {
  const db = useDrizzle()

  const templates = await db.query.templates.findMany({
    // columns: {
    //   id: true,
    //   title: true,
    //   shortDescription: true,
    //   description: true,
    //   status: true,
    //   paidStatus: true,
    //   liveUrl: true,
    //   accessUrl: true,
    // },
    with: {
      category: true,
      creator: true,
      module: {
        with: {
          module: true,
        },
      },
    },

  })

  // const templates = await db.select({
  //   id: tables.templates.id,
  //   title: tables.templates.title,
  //   shortDescription: tables.templates.shortDescription,
  //   description: tables.templates.description,
  //   status: tables.templates.status,
  //   paidStatus: tables.templates.paidStatus,
  //   liveUrl: tables.templates.liveUrl,
  //   accessUrl: tables.templates.accessUrl,
  //   user: {
  //     name: tables.users.name,
  //     login: tables.users.login,
  //     avatarUrl: tables.users.avatarUrl,
  //   },
  //   category: {
  //     /**
  //      * The `name` field is aliased to `c_name` to avoid
  //      * conflicts with the `name` field from the `tamplate` table. Issue in D1
  //      *
  //      * https://github.com/cloudflare/workers-sdk/issues/3160
  //      */
  //     name: sql<string>`${tables.categories.name}`.as('c_name'),
  //   },
  // }).from(tables.templates)
  //   .leftJoin(tables.users, eq(tables.templates.creatorId, tables.users.id))
  //   .leftJoin(tables.categories, eq(tables.templates.categoryId, tables.categories.id))

  return templates
})
