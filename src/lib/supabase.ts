import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''

export const storageBucket =
  process.env.SUPABASE_STORAGE_BUCKET ?? 'projects-images'

export function getSupabaseAdmin() {
  if (!supabaseUrl || !serviceRoleKey) {
    return null
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

export function getPublicStorageUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '')
  if (!base) return path
  return `${base}/storage/v1/object/public/${storageBucket}/${path}`
}

export async function uploadProjectImage(
  file: File,
  filename: string,
): Promise<string | null> {
  const supabase = getSupabaseAdmin()
  if (!supabase) {
    // Local dev fallback: store as data URL path marker or skip upload
    return null
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const ext = file.name.split('.').pop() ?? 'jpg'
  const key = `projects/${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}.${ext}`

  const { error } = await supabase.storage
    .from(storageBucket)
    .upload(key, buffer, {
      contentType: file.type,
      upsert: false,
    })

  if (error) {
    console.error('Supabase upload error:', error)
    throw new Error('Failed to upload image')
  }

  return getPublicStorageUrl(key)
}

export async function deleteProjectImageByUrl(imageUrl: string): Promise<void> {
  const supabase = getSupabaseAdmin()
  if (!supabase || !imageUrl) return

  const prefix = `/storage/v1/object/public/${storageBucket}/`
  const idx = imageUrl.indexOf(prefix)
  if (idx === -1) return

  const key = imageUrl.slice(idx + prefix.length)
  await supabase.storage.from(storageBucket).remove([key])
}
