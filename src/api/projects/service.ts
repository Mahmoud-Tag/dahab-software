import { prisma } from '@/lib/prisma'
import { deleteProjectImageByUrl, uploadProjectImage } from '@/lib/supabase'
import {
  buildProjectData,
  toProjectJson,
  type ProjectInput,
} from '@/utils/serializers'
import type { ParsedProjectForm } from './parse-form'

export async function listProjects() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return projects.map(toProjectJson)
}

export async function getProject(id: number) {
  const project = await prisma.project.findUnique({ where: { id } })
  if (!project) return null
  return toProjectJson(project)
}

export async function createProject(parsed: ParsedProjectForm) {
  let imageUrl: string | null = null
  if (parsed.imageFile) {
    try {
      imageUrl = await uploadProjectImage(parsed.imageFile, parsed.title)
    } catch (err) {
      console.error('Image upload failed, using fallback:', err)
    }
    if (!imageUrl) {
      imageUrl = `/portfolio-website.png`
    }
  }

  const input: ProjectInput = {
    title: parsed.title,
    category: parsed.category,
    desc: parsed.desc,
    fullDesc: parsed.fullDesc,
    image: imageUrl,
    tags: parsed.tags,
    year: parsed.year,
    type: parsed.type,
    language: parsed.language,
    downloadUrl: parsed.downloadUrl,
    features: parsed.features,
  }

  const project = await prisma.project.create({ data: buildProjectData(input) })
  return toProjectJson(project)
}

export async function updateProject(id: number, parsed: ParsedProjectForm) {
  const existing = await prisma.project.findUnique({ where: { id } })
  if (!existing) return null

  let imageUrl = existing.image
  if (parsed.imageFile) {
    try {
      const newUrl = await uploadProjectImage(parsed.imageFile, parsed.title)
      if (newUrl) {
        if (existing.image) await deleteProjectImageByUrl(existing.image)
        imageUrl = newUrl
      }
    } catch (err) {
      console.error('Image upload failed, keeping existing image:', err)
    }
  }

  const input: ProjectInput = {
    title: parsed.title,
    category: parsed.category,
    desc: parsed.desc,
    fullDesc: parsed.fullDesc,
    image: imageUrl,
    tags: parsed.tags,
    year: parsed.year,
    type: parsed.type,
    language: parsed.language,
    downloadUrl: parsed.downloadUrl,
    features: parsed.features,
  }

  const project = await prisma.project.update({
    where: { id },
    data: buildProjectData(input),
  })
  return toProjectJson(project)
}

export async function deleteProject(id: number) {
  const existing = await prisma.project.findUnique({ where: { id } })
  if (!existing) return false
  if (existing.image) await deleteProjectImageByUrl(existing.image)
  await prisma.project.delete({ where: { id } })
  return true
}

export async function incrementDownloads(id: number) {
  const project = await prisma.project.update({
    where: { id },
    data: { downloads: { increment: 1 } },
  })
  return toProjectJson(project)
}
