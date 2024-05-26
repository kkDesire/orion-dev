export default defineEventHandler(async (event) => {
  await requireAdminUser(event)

  const db = useDrizzle()
  const users = await db.select({
    id: tables.users.id,
    githubId: tables.users.githubId,
    username: tables.users.username,
    avatarUrl: tables.users.avatarUrl,
    roleType: tables.users.roleType,
  }).from(tables.users)

  if (!users)
    throw createError({ statusCode: 404, statusMessage: 'Users not found' })
  return users
})
