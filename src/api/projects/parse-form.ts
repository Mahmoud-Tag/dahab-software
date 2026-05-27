import { normalizeJsonArray } from '@/utils/serializers'

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
    desc: formData.get('desc') ? String(formData.get('desc')) : null,
    fullDesc: formData.get('fullDesc') ? String(formData.get('fullDesc')) : null,
    tags,
    year: formData.get('year') ? String(formData.get('year')) : null,
    type: formData.get('type') ? String(formData.get('type')) : null,
    language: formData.get('language') ? String(formData.get('language')) : null,
    downloadUrl: formData.get('downloadUrl')
      ? String(formData.get('downloadUrl'))
      : null,
    features,
    imageFile,
  }
}

export function validateProjectForm(data: ParsedProjectForm): Record<string, string[]> | null {
  const errors: Record<string, string[]> = {}

  if (!data.title) errors.title = ['The title field is required.']
  if (!data.category) errors.category = ['The category field is required.']

  if (data.imageFile) {
    if (!data.imageFile.type.startsWith('image/')) {
      errors.image = ['The image must be an image.']
    }
    if (data.imageFile.size > 2 * 1024 * 1024) {
      errors.image = ['The image must not be greater than 2048 kilobytes.']
    }
  }

  return Object.keys(errors).length ? errors : null
}

export function validationErrorResponse(errors: Record<string, string[]>) {
  return Response.json(
    {
      message: 'The given data was invalid.',
      errors,
    },
    { status: 422 },
  )
}
