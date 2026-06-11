import { uploadToCloudinary } from '@/lib/cloudinary'

const MAX_IMAGE_SIZE_MB = 10
const MAX_IMAGE_SIZE = MAX_IMAGE_SIZE_MB * 1024 * 1024

function optionalString(formData: FormData, key: string): string | null {
  const value = String(formData.get(key) ?? '').trim()
  return value || null
}

function optionalSocialUrl(formData: FormData, key: 'linkedin' | 'github' | 'twitter'): string | null {
  const value = optionalString(formData, key)
  if (!value) return null
  if (value.startsWith('@')) return socialProfileUrl(key, value.slice(1))
  return /^https?:\/\//i.test(value) ? value : `https://${value}`
}

function socialProfileUrl(key: 'linkedin' | 'github' | 'twitter', username: string) {
  const cleanUsername = username.trim().replace(/^\/+/, '')
  if (!cleanUsername) return null
  if (key === 'linkedin') return `https://linkedin.com/in/${cleanUsername}`
  if (key === 'github') return `https://github.com/${cleanUsername}`
  return `https://x.com/${cleanUsername}`
}

export type ParsedTeamMemberForm = {
  name: string
  role: string
  specialty: string | null
  image: string | null
  imagePublicId: string | null
  imageFile: File | null
  email: string | null
  phone: string | null
  linkedin: string | null
  github: string | null
  twitter: string | null
}

export function parseTeamMemberFormData(formData: FormData): ParsedTeamMemberForm {
  const imageEntry = formData.get('image')
  const fileEntry = formData.get('imageFile')
  const imageFile = fileEntry instanceof File && fileEntry.size > 0 ? fileEntry : null

  const image = typeof imageEntry === 'string' && imageEntry.trim() && !imageFile
    ? imageEntry.trim()
    : null

  return {
    name: String(formData.get('name') ?? '').trim(),
    role: String(formData.get('role') ?? '').trim(),
    specialty: optionalString(formData, 'specialty'),
    image,
    imagePublicId: null,
    imageFile,
    email: optionalString(formData, 'email'),
    phone: optionalString(formData, 'phone'),
    linkedin: optionalSocialUrl(formData, 'linkedin'),
    github: optionalSocialUrl(formData, 'github'),
    twitter: optionalSocialUrl(formData, 'twitter'),
  }
}

export function validateTeamMemberForm(data: ParsedTeamMemberForm): Record<string, string[]> | null {
  const errors: Record<string, string[]> = {}

  if (!data.name) errors.name = ['حقل الاسم مطلوب.']
  if (!data.role) errors.role = ['حقل المسمى الوظيفي مطلوب.']
  if (data.name.length > 160) errors.name = ['يجب ألا يتجاوز الاسم 160 حرفاً.']
  if (data.role.length > 120) errors.role = ['يجب ألا يتجاوز المسمى الوظيفي 120 حرفاً.']
  if (data.specialty && data.specialty.length > 240) errors.specialty = ['يجب ألا يتجاوز التخصص 240 حرفاً.']
  if (data.image && !isValidImageUrl(data.image)) {
    errors.image = ['يجب أن يكون رابط الصورة صالحاً.']
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = ['يجب أن يكون البريد الإلكتروني صالحاً.']
  }
  if (data.phone && !/^[\d\s\-+()]+$/.test(data.phone)) {
    errors.phone = ['يجب أن يكون رقم الهاتف صالحاً.']
  }
  if (data.linkedin && !isValidHttpUrl(data.linkedin)) {
    errors.linkedin = ['يجب أن يكون رابط LinkedIn صالحاً.']
  }
  if (data.github && !isValidHttpUrl(data.github)) {
    errors.github = ['يجب أن يكون رابط GitHub صالحاً.']
  }
  if (data.twitter && !isValidHttpUrl(data.twitter)) {
    errors.twitter = ['يجب أن يكون رابط Twitter صالحاً.']
  }
  if (data.imageFile) {
    if (!data.imageFile.type.startsWith('image/')) {
      errors.image = ['يجب أن يكون الملف صورة.']
    }
    if (data.imageFile.size > MAX_IMAGE_SIZE) {
      errors.image = [`يجب ألا يتجاوز حجم الصورة ${MAX_IMAGE_SIZE_MB} ميجابايت.`]
    }
  }

  return Object.keys(errors).length ? errors : null
}

export async function uploadTeamMemberImage(data: ParsedTeamMemberForm) {
  if (!data.imageFile) return data

  const uploaded = await uploadToCloudinary(data.imageFile, data.name || 'team-member')
  return {
    ...data,
    image: uploaded.url,
    imagePublicId: uploaded.publicId,
  }
}

function isValidHttpUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function isValidImageUrl(value: string) {
  if (value.startsWith('/')) return true
  return isValidHttpUrl(value)
}

export function validationErrorResponse(errors: Record<string, string[]>) {
  const firstError = Object.values(errors).flat()[0]
  return Response.json(
    {
      message: firstError || 'البيانات المدخلة غير صالحة.',
      errors,
    },
    { status: 422 },
  )
}
