export default defineEventHandler(async (event) => {
  const user = await requireUserSession(event)

  const templates = await useDrizzle().query.templates.findMany({
    where: eq(tables.templates.userId, user.user.id),
    columns: {
      id: true,
      hash: true,
      slug: true,
      // featuredImage: true,
      title: true,
      paidStatus: true,
      accessUrl: true,
      liveUrl: true,
      shortDescription: true,
      description: true,
    },
    with: {
      category: {
        columns: {
          id: true,
          slug: true,
          name: true,
        },
      },
      creator: {
        columns: {
          id: true,
          name: true,
          login: true,
          avatarUrl: true,
        },
      },
      modules: {
        columns: {
          templateId: true,
          moduleId: true,
        },
        with: {
          columns: {
            id: true,
            name: true,
            repo: true,
            type: true,
          },
        },
      },
    },
  })
  return templates
})
