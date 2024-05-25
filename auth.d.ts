declare module '#auth-utils' {
  interface User {
    githubId: number
    username: string
    avatarUrl: string
  }

  interface Category {
    name: string
    slug: string
  }
  interface UserSession { }
}

export { }
