export type ProjectJson = {
  id: number
  title: string
  category: string
  catIcon: string | null
  desc: string | null
  fullDesc: string | null
  image: string | null
  tags: string[]
  year: string | null
  type: string | null
  language: string | null
  downloads: number
  downloadUrl: string | null
  features: string[]
  created_at: string
  updated_at: string
  views: number
}

export type MessageJson = {
  id: number
  name: string
  email: string
  message: string
  created_at: string
  updated_at: string
}

export type UserJson = {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
}

export type ServiceItem = {
  icon: string
  title: string
  desc: string
  features: string[]
}
