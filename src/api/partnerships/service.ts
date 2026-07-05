import { prisma } from '@/lib/prisma'
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary'
import { deleteProjectImageByUrl } from '@/lib/supabase'
import type { ParsedPartnershipForm } from './parse-form'

type PartnershipRecord = {
  id: number
  title: string
  partnerName: string
  desc: string | null
  fullDesc: string | null
  image: string | null
  imagePublicId: string | null
  websiteUrl: string | null
  status: string | null
  createdAt: Date
  updatedAt: Date
}

type PartnershipInput = {
  title: string
  partnerName: string
  desc?: string | null
  fullDesc?: string | null
  image?: string | null
  imagePublicId?: string | null
  websiteUrl?: string | null
  status?: string | null
}

function toPartnershipJson(partnership: PartnershipRecord) {
  return {
    id: partnership.id,
    title: partnership.title,
    partnerName: partnership.partnerName,
    desc: partnership.desc,
    fullDesc: partnership.fullDesc,
    image: partnership.image,
    imagePublicId: partnership.imagePublicId,
    websiteUrl: partnership.websiteUrl,
    status: partnership.status,
    created_at: partnership.createdAt.toISOString(),
    updated_at: partnership.updatedAt.toISOString(),
  }
}

export async function listPartnerships() {
  const partnerships = await prisma.partnership.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return partnerships.map(toPartnershipJson)
}

export async function getPartnership(id: number) {
  const partnership = await prisma.partnership.findUnique({ where: { id } })
  if (!partnership) return null
  return toPartnershipJson(partnership)
}

export async function createPartnership(parsed: ParsedPartnershipForm) {
  let imageUrl: string | null = null
  let imagePublicId: string | null = null

  if (parsed.imageFile) {
    const uploaded = await uploadToCloudinary(parsed.imageFile, parsed.partnerName)
    imageUrl = uploaded.url
    imagePublicId = uploaded.publicId
  }

  try {
    const partnership = await prisma.partnership.create({
      data: {
        title: parsed.title,
        partnerName: parsed.partnerName,
        desc: parsed.desc,
        fullDesc: parsed.fullDesc,
        image: imageUrl,
        imagePublicId,
        websiteUrl: parsed.websiteUrl,
        status: parsed.status,
      },
    })
    return toPartnershipJson(partnership)
  } catch (error) {
    if (imagePublicId) await deleteFromCloudinary(imagePublicId)
    throw error
  }
}

export async function updatePartnership(id: number, parsed: ParsedPartnershipForm) {
  const existing = await prisma.partnership.findUnique({ where: { id } })
  if (!existing) return null

  let imageUrl = existing.image
  let imagePublicId = existing.imagePublicId
  let previousImagePublicId: string | null = null
  let previousImageUrl: string | null = null
  let uploadedImagePublicIdToCleanup: string | null = null

  if (parsed.imageFile) {
    const uploaded = await uploadToCloudinary(parsed.imageFile, parsed.partnerName)
    imageUrl = uploaded.url
    imagePublicId = uploaded.publicId
    previousImagePublicId = existing.imagePublicId
    previousImageUrl = existing.image
    uploadedImagePublicIdToCleanup = uploaded.publicId
  }

  try {
    const partnership = await prisma.partnership.update({
      where: { id },
      data: {
        title: parsed.title,
        partnerName: parsed.partnerName,
        desc: parsed.desc,
        fullDesc: parsed.fullDesc,
        image: imageUrl,
        imagePublicId,
        websiteUrl: parsed.websiteUrl,
        status: parsed.status,
      },
    })

    if (previousImagePublicId) {
      await deleteFromCloudinary(previousImagePublicId)
    } else if (previousImageUrl) {
      await deleteProjectImageByUrl(previousImageUrl)
    }

    return toPartnershipJson(partnership)
  } catch (error) {
    if (uploadedImagePublicIdToCleanup) await deleteFromCloudinary(uploadedImagePublicIdToCleanup)
    throw error
  }
}

export async function deletePartnership(id: number) {
  const existing = await prisma.partnership.findUnique({ where: { id } })
  if (!existing) return false

  await prisma.partnership.delete({ where: { id } })

  if (existing.imagePublicId) {
    await deleteFromCloudinary(existing.imagePublicId)
  } else if (existing.image) {
    await deleteProjectImageByUrl(existing.image)
  }

  return true
}
