import { normalizeJsonArray } from '@/utils/serializers'

const PROJECT_TYPES = new Set(['web', 'app', 'system', 'ecommerce', 'ai', 'resource'])

function optionalString(formData: FormData, key: string): string | null {
  const value = String(formData.get(key) ?? '').trim()
  return value || null
}

export type ParsedProjectForm = {
  title: string
  category: string
  desc: string | null
  fullDesc: string | null
  tags: string[]
  year: string | null
  type: string | null
  language: string | null
  downloadUrl: string | null
  features: string[]
  imageFile: File | null
}

export async function parseProjectFormData(
  formData: FormData,
): Promise<ParsedProjectForm> {
  const tagsRaw = formData.get('tags')
  const featuresRaw = formData.get('features')

  let tags: string[] = []
  let features: string[] = []

  if (typeof tagsRaw === 'string') {
    tags = normalizeJsonArray(tagsRaw)
  }
  if (typeof featuresRaw === 'string') {
    features = normalizeJsonArray(featuresRaw)
  }

  const imageEntry = formData.get('image')
  const imageFile =
    imageEntry instanceof File && imageEntry.size > 0 ? imageEntry : null

  return {
    title: String(formData.get('title') ?? '').trim(),
    category: String(formData.get('category') ?? '').trim(),
    desc: optionalString(formData, 'desc'),
    fullDesc: optionalString(formData, 'fullDesc'),
    tags,
    year: optionalString(formData, 'year'),
    type: optionalString(formData, 'type'),
    language: optionalString(formData, 'language'),
    downloadUrl: optionalString(formData, 'downloadUrl'),
    features,
    imageFile,
  }
}

export function validateProjectForm(data: ParsedProjectForm): Record<string, string[]> | null {
  const errors: Record<string, string[]> = {}

  if (!data.title) errors.title = ['حقل اسم المشروع مطلوب.']
  if (!data.category) errors.category = ['حقل التصنيف مطلوب.']
  if (data.title.length > 160) errors.title = ['يجب ألا يتجاوز اسم المشروع 160 حرفاً.']
  if (data.category.length > 120) errors.category = ['يجب ألا يتجاوز التصنيف 120 حرفاً.']
  if (data.desc && data.desc.length > 500) errors.desc = ['يجب ألا يتجاوز الوصف المختصر 500 حرف.']
  if (data.fullDesc && data.fullDesc.length > 10000) errors.fullDesc = ['يجب ألا تتجاوز تفاصيل المشروع 10000 حرف.']
  if (data.year && !/^\d{4}$/.test(data.year)) errors.year = ['يجب أن تكون السنة مكونة من أربعة أرقام.']
  if (data.type && !PROJECT_TYPES.has(data.type)) errors.type = ['نوع المشروع المحدد غير صالح.']
  if (data.language && data.language.length > 240) errors.language = ['يجب ألا يتجاوز حقل اللغات 240 حرفاً.']
  if (data.downloadUrl) {
    try {
      const url = new URL(data.downloadUrl)
      if (!['http:', 'https:'].includes(url.protocol)) {
        errors.downloadUrl = ['يجب أن يكون رابط التحميل رابط HTTP أو HTTPS صالحاً.']
      }
    } catch {
      errors.downloadUrl = ['يجب أن يكون رابط التحميل صالحاً.']
    }
  }
  if (data.tags.length > 20) errors.tags = ['يجب ألا يحتوي المشروع على أكثر من 20 وسم.']
  if (data.tags.some((tag) => tag.length > 50)) errors.tags = ['يجب ألا يتجاوز كل وسم 50 حرفاً.']
  if (data.features.length > 30) errors.features = ['يجب ألا يحتوي المشروع على أكثر من 30 ميزة.']
  if (data.features.some((feature) => feature.length > 160)) errors.features = ['يجب ألا تتجاوز كل ميزة 160 حرفاً.']

  if (data.imageFile) {
    if (!data.imageFile.type.startsWith('image/')) {
      errors.image = ['يجب أن يكون الملف صورة.']
    }
    if (data.imageFile.size > 2 * 1024 * 1024) {
      errors.image = ['يجب ألا يتجاوز حجم الصورة 2048 كيلوبايت.']
    }
  }

  return Object.keys(errors).length ? errors : null
}

export function validationErrorResponse(errors: Record<string, string[]>) {
  return Response.json(
    {
      message: 'البيانات المدخلة غير صالحة.',
      errors,
    },
    { status: 422 },
  )
}
