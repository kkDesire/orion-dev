declare module '#auth-utils' {
  interface User {
    login: string
    email: string
    name: string
    avatarUrl: string
    roleType: 'admin' | 'creator'
  }

  interface Category {
    id: number
    name: string
    slug: string
  }
  interface UserSession { }
}

export { }
