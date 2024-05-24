export default oauth.githubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user }) {
    const db = useDrizzle()
    await db.insert(tables.users).values({
      githubId: user.id,
      username: user.login,
      avatarUrl: user.avatar_url,
    }).onConflictDoUpdate({
      target: tables.users.githubId,
      set: {
        username: user.login,
        avatarUrl: user.avatar_url,
      },
    })
    await setUserSession(event, {
      user: {
        githubId: user.id,
        username: user.login,
        avatarUrl: user.avatar_url,
      },
    })
    return sendRedirect(event, '/')
  },
  onError(event, error) {
    console.error('Github OAuth error: ', error)
    return sendRedirect(event, '/')
  },
})
