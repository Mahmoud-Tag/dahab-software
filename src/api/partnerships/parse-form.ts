import { uploadToCloudinary } from '@/lib/cloudinary'

const PARTNERSHIP_STATUSES = new Set(['active', 'inactive'])
const MAX_IMAGE_SIZE_MB = 10
const MAX_IMAGE_SIZE = MAX_IMAGE_SIZE_MB * 1024 * 1024

function optionalString(formData: FormData, key: string): string | null {
  const value = String(formData.get(key) ?? '').trim()
  return value || null
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

export type ParsedPartnershipForm = {
  title: string
  partnerName: string
  desc: string | null
  fullDesc: string | null
  image: string | null
  imagePublicId: string | null
  imageFile: File | null
  websiteUrl: string | null
  status: string | null
}

export function parsePartnershipFormData(formData: FormData): ParsedPartnershipForm {
  const imageEntry = formData.get('image')
  const fileEntry = formData.get('imageFile')
  const imageFile = fileEntry instanceof File && fileEntry.size > 0 ? fileEntry : null

  const image = typeof imageEntry === 'string' && imageEntry.trim() && !imageFile ? imageEntry.trim() : null

  return {
    title: String(formData.get('title') ?? '').trim(),
    partnerName: String(formData.get('partnerName') ?? '').trim(),
    desc: optionalString(formData, 'desc'),
    fullDesc: optionalString(formData, 'fullDesc'),
    image,
    imagePublicId: null,
    imageFile,
    websiteUrl: optionalString(formData, 'websiteUrl'),
    status: optionalString(formData, 'status'),
  }
}

export function validatePartnershipForm(data: ParsedPartnershipForm): Record<string, string[]> | null {
  const errors: Record<string, string[]> = {}

  if (!data.title) errors.title = ['حقل عنوان الشراكة مطلوب.']
  if (!data.partnerName) errors.partnerName = ['حقل اسم الشريك مطلوب.']
  if (data.title.length > 160) errors.title = ['يجب ألا يتجاوز العنوان 160 حرفاً.']
  if (data.partnerName.length > 120) errors.partnerName = ['يجب ألا يتجاوز اسم الشريك 120 حرفاً.']
  if (data.desc && data.desc.length > 500) errors.desc = ['يجب ألا يتجاوز الوصف المختصر 500 حرف.']
  if (data.fullDesc && data.fullDesc.length > 10000) errors.fullDesc = ['يجب ألا تتجاوز تفاصيل الشراكة 10000 حرف.']
  if (data.websiteUrl && !isValidHttpUrl(data.websiteUrl)) {
    errors.websiteUrl = ['يجب أن يكون الرابط صالحاً وبدءاً بـ http أو https.']
  }
  if (data.status && !PARTNERSHIP_STATUSES.has(data.status)) {
    errors.status = ['حالة الشراكة غير صالحة.']
  }
  if (data.image && !isValidImageUrl(data.image)) {
    errors.image = ['يجب أن يكون رابط الصورة صالحاً.']
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

export async function uploadPartnershipImage(data: ParsedPartnershipForm) {
  if (!data.imageFile) return data

  const uploaded = await uploadToCloudinary(data.imageFile, data.partnerName || 'partnership-logo')
  return {
    ...data,
    image: uploaded.url,
    imagePublicId: uploaded.publicId,
  }
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
