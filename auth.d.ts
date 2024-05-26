declare module '#auth-utils' {
  interface User {
    githubId: number
    username: string
    avatarUrl: string
    roleType: 'admin' | 'creator' | null
  }

  interface Category {
    id: number
    name: string
    slug: string
  }
  interface UserSession { }
}

export { }
