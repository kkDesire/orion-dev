export default oauth.githubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user }) {
    const db = useDrizzle()
    const saveUser = await db.insert(tables.users).values({
      githubId: user.id,
      username: user.login,
      avatarUrl: user.avatar_url,
    }).onConflictDoUpdate({
      target: tables.users.githubId,
      set: {
        username: user.login,
        avatarUrl: user.avatar_url,
      },
    }).returning().get()

    await setUserSession(event, {
      user: {
        githubId: saveUser.githubId,
        username: saveUser.username,
        avatarUrl: saveUser.avatarUrl,
        roleType: saveUser.roleType,
      },
    })
    return sendRedirect(event, '/')
  },
  onError(event, error) {
    console.error('Github OAuth error: ', error)
    return sendRedirect(event, '/')
  },
})
