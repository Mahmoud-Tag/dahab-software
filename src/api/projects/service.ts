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

  const images: string[] = []
  const imagePublicIds: string[] = []

  if (parsed.imageFiles && parsed.imageFiles.length > 0) {
    const uploadPromises = parsed.imageFiles.map((file) =>
      uploadToCloudinary(file, `${parsed.title}-gallery`)
    )
    const uploadedFiles = await Promise.all(uploadPromises)
    for (const uploaded of uploadedFiles) {
      images.push(uploaded.url)
      imagePublicIds.push(uploaded.publicId)
    }
  }

  const input: ProjectInput = {
    title: parsed.title,
    category: parsed.category,
    desc: parsed.desc,
    fullDesc: parsed.fullDesc,
    image: imageUrl,
    imagePublicId,
    images,
    imagePublicIds,
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
    for (const id of imagePublicIds) {
      await deleteFromCloudinary(id)
    }
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

  let images = existing.images || []
  let imagePublicIds = existing.imagePublicIds || []
  const newlyUploadedPublicIdsToCleanup: string[] = []

  // Handle deletions
  if (parsed.deletedImages && parsed.deletedImages.length > 0) {
    const imagesToKeep: string[] = []
    const publicIdsToKeep: string[] = []
    
    for (let i = 0; i < images.length; i++) {
      if (parsed.deletedImages.includes(images[i])) {
        if (imagePublicIds[i]) {
          await deleteFromCloudinary(imagePublicIds[i])
        } else {
          await deleteProjectImageByUrl(images[i])
        }
      } else {
        imagesToKeep.push(images[i])
        publicIdsToKeep.push(imagePublicIds[i])
      }
    }
    
    images = imagesToKeep
    imagePublicIds = publicIdsToKeep
  }

  if (parsed.imageFiles && parsed.imageFiles.length > 0) {
    const uploadPromises = parsed.imageFiles.map((file) =>
      uploadToCloudinary(file, `${parsed.title}-gallery`)
    )
    const uploadedFiles = await Promise.all(uploadPromises)
    for (const uploaded of uploadedFiles) {
      images.push(uploaded.url)
      imagePublicIds.push(uploaded.publicId)
      newlyUploadedPublicIdsToCleanup.push(uploaded.publicId)
    }
  }

  const input: ProjectInput = {
    title: parsed.title,
    category: parsed.category,
    desc: parsed.desc,
    fullDesc: parsed.fullDesc,
    image: imageUrl,
    imagePublicId,
    images,
    imagePublicIds,
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
    for (const id of newlyUploadedPublicIdsToCleanup) {
      await deleteFromCloudinary(id)
    }
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

  if (existing.imagePublicIds && existing.imagePublicIds.length > 0) {
    for (const id of existing.imagePublicIds) {
      await deleteFromCloudinary(id)
    }
  } else if (existing.images && existing.images.length > 0) {
    for (const url of existing.images) {
      await deleteProjectImageByUrl(url)
    }
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
