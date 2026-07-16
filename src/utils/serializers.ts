import type { Message, Project } from '@prisma/client'
import { Prisma } from '@prisma/client'

export function normalizeJsonArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String)
  if (typeof value === 'string' && value.trim()) {
    try {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed) ? parsed.map(String) : []
    } catch {
      return value.split(',').map((s) => s.trim()).filter(Boolean)
    }
  }
  return []
}

export function toProjectJson(project: Project) {
  return {
    id: project.id,
    title: project.title,
    category: project.category,
    catIcon: project.catIcon,
    desc: project.desc,
    fullDesc: project.fullDesc,
    image: project.image,
    images: project.images,
    tags: normalizeJsonArray(project.tags),
    year: project.year,
    type: project.type,
    language: project.language,
    downloads: project.downloads,
    downloadUrl: project.downloadUrl,
    websiteUrl: project.websiteUrl,
    status: project.status,
    features: normalizeJsonArray(project.features),
    created_at: project.createdAt.toISOString(),
    updated_at: project.updatedAt.toISOString(),
    views: 0,
  }
}

export function toMessageJson(message: Message) {
  return {
    id: message.id,
    name: message.name,
    email: message.email,
    message: message.message,
    created_at: message.createdAt.toISOString(),
    updated_at: message.updatedAt.toISOString(),
  }
}

export type ProjectInput = {
  title: string
  category: string
  desc?: string | null
  fullDesc?: string | null
  image?: string | null
  imagePublicId?: string | null
  images?: string[] | null
  imagePublicIds?: string[] | null
  tags?: string[] | null
  year?: string | null
  type?: string | null
  language?: string | null
  downloadUrl?: string | null
  websiteUrl?: string | null
  status?: string | null
  features?: string[] | null
}

export function buildProjectData(input: ProjectInput): Prisma.ProjectCreateInput {
  return {
    title: input.title,
    category: input.category,
    desc: input.desc ?? null,
    fullDesc: input.fullDesc ?? null,
    image: input.image ?? null,
    imagePublicId: input.imagePublicId ?? null,
    images: input.images ?? [],
    imagePublicIds: input.imagePublicIds ?? [],
    tags: input.tags ?? [],
    year: input.year ?? null,
    type: input.type ?? null,
    language: input.language ?? null,
    downloadUrl: input.downloadUrl ?? null,
    websiteUrl: input.websiteUrl ?? null,
    status: input.status ?? null,
    features: input.features ?? [],
  }
}
