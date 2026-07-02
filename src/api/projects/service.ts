import { prisma } from '@/lib/prisma'
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary'
import { deleteProjectImageByUrl } from '@/lib/supabase'
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
  let imagePublicId: string | null = null

  if (parsed.imageFile) {
    const uploaded = await uploadToCloudinary(parsed.imageFile, parsed.title)
    imageUrl = uploaded.url
    imagePublicId = uploaded.publicId
  }

  const input: ProjectInput = {
    title: parsed.title,
    category: parsed.category,
    desc: parsed.desc,
    fullDesc: parsed.fullDesc,
    image: imageUrl,
    imagePublicId,
    tags: parsed.tags,
    year: parsed.year,
    type: parsed.type,
    language: parsed.language,
    downloadUrl: parsed.downloadUrl,
    websiteUrl: parsed.websiteUrl,
    status: parsed.status,
    features: parsed.features,
  }

  try {
    const project = await prisma.project.create({ data: buildProjectData(input) })
    return toProjectJson(project)
  } catch (error) {
    if (imagePublicId) await deleteFromCloudinary(imagePublicId)
    throw error
  }
}

export async function updateProject(id: number, parsed: ParsedProjectForm) {
  const existing = await prisma.project.findUnique({ where: { id } })
  if (!existing) return null

  let imageUrl = existing.image
  let imagePublicId = existing.imagePublicId

  let previousImageToDelete: string | null = null
  let previousImagePublicIdToDelete: string | null = null
  let uploadedImagePublicIdToCleanup: string | null = null

  if (parsed.imageFile) {
    const uploaded = await uploadToCloudinary(parsed.imageFile, parsed.title)
    imageUrl = uploaded.url
    imagePublicId = uploaded.publicId

    previousImageToDelete = existing.image
    previousImagePublicIdToDelete = existing.imagePublicId
    uploadedImagePublicIdToCleanup = uploaded.publicId
  }

  const input: ProjectInput = {
    title: parsed.title,
    category: parsed.category,
    desc: parsed.desc,
    fullDesc: parsed.fullDesc,
    image: imageUrl,
    imagePublicId,
    tags: parsed.tags,
    year: parsed.year,
    type: parsed.type,
    language: parsed.language,
    downloadUrl: parsed.downloadUrl,
    websiteUrl: parsed.websiteUrl,
    status: parsed.status,
    features: parsed.features,
  }

  try {
    const project = await prisma.project.update({
      where: { id },
      data: buildProjectData(input),
    })

    if (previousImagePublicIdToDelete) {
      await deleteFromCloudinary(previousImagePublicIdToDelete)
    } else if (previousImageToDelete) {
      await deleteProjectImageByUrl(previousImageToDelete)
    }
    return toProjectJson(project)
  } catch (error) {
    if (uploadedImagePublicIdToCleanup) await deleteFromCloudinary(uploadedImagePublicIdToCleanup)
    throw error
  }
}

export async function deleteProject(id: number) {
  const existing = await prisma.project.findUnique({ where: { id } })
  if (!existing) return false
  await prisma.project.delete({ where: { id } })
  
  if (existing.imagePublicId) {
    await deleteFromCloudinary(existing.imagePublicId)
  } else if (existing.image) {
    await deleteProjectImageByUrl(existing.image)
  }
  return true
}

export async function incrementDownloads(id: number) {
  const project = await prisma.project.update({
    where: { id },
    data: { downloads: { increment: 1 } },
  })
  return toProjectJson(project)
}
