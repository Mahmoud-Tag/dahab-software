import { prisma } from '@/lib/prisma'
import { deleteFromCloudinary } from '@/lib/cloudinary'
import { deleteProjectImageByUrl } from '@/lib/supabase'
import type { ParsedTeamMemberForm } from './parse-form'

export async function listTeamMembers() {
  const members = await prisma.teamMember.findMany({
    orderBy: { createdAt: 'asc' },
  })
  return members.map(toTeamMemberJson)
}

export async function getTeamMember(id: number) {
  const member = await prisma.teamMember.findUnique({ where: { id } })
  if (!member) return null
  return toTeamMemberJson(member)
}

export async function createTeamMember(parsed: ParsedTeamMemberForm) {
  const member = await prisma.teamMember.create({
    data: {
      name: parsed.name,
      role: parsed.role,
      specialty: parsed.specialty ?? null,
      image: parsed.image,
      imagePublicId: parsed.imagePublicId,
      email: parsed.email,
      phone: parsed.phone,
      linkedin: parsed.linkedin,
      github: parsed.github,
      twitter: parsed.twitter,
    },
  })
  return toTeamMemberJson(member)
}

export async function updateTeamMember(id: number, parsed: ParsedTeamMemberForm) {
  const existing = await prisma.teamMember.findUnique({ where: { id } })
  if (!existing) return null

  const imageChanged = parsed.image !== existing.image
  const imagePublicId = imageChanged ? parsed.imagePublicId : existing.imagePublicId
  const newPublicId = imageChanged ? imagePublicId : null

  try {
    const member = await prisma.teamMember.update({
      where: { id },
      data: {
        name: parsed.name,
        role: parsed.role,
        specialty: parsed.specialty,
        image: parsed.image,
        imagePublicId,
        email: parsed.email,
        phone: parsed.phone,
        linkedin: parsed.linkedin,
        github: parsed.github,
        twitter: parsed.twitter,
      },
    })

    if (imageChanged && existing.imagePublicId) {
      await deleteFromCloudinary(existing.imagePublicId)
    } else if (imageChanged && existing.image && !existing.imagePublicId) {
      await deleteProjectImageByUrl(existing.image)
    }

    return toTeamMemberJson(member)
  } catch (error) {
    if (newPublicId) {
      await deleteFromCloudinary(newPublicId)
    }
    throw error
  }
}

export async function deleteTeamMember(id: number) {
  const existing = await prisma.teamMember.findUnique({ where: { id } })
  if (!existing) return false

  await prisma.teamMember.delete({ where: { id } })

  if (existing.imagePublicId) {
    await deleteFromCloudinary(existing.imagePublicId)
  } else if (existing.image) {
    await deleteProjectImageByUrl(existing.image)
  }
  return true
}

function toTeamMemberJson(member: {
  id: number
  name: string
  role: string
  image: string | null
  imagePublicId: string | null
  specialty: string | null
  email: string | null
  phone: string | null
  linkedin: string | null
  github: string | null
  twitter: string | null
  createdAt: Date
  updatedAt: Date
}) {
  return {
    id: member.id,
    name: member.name,
    role: member.role,
    image: member.image,
    imagePublicId: member.imagePublicId,
    specialty: member.specialty,
    email: member.email,
    phone: member.phone,
    linkedin: member.linkedin,
    github: member.github,
    twitter: member.twitter,
    created_at: member.createdAt.toISOString(),
    updated_at: member.updatedAt.toISOString(),
  }
}
