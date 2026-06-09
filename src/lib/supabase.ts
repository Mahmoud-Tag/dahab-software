import { createClient } from '@supabase/supabase-js'
import { mkdir, writeFile, unlink } from 'fs/promises'
import { join } from 'path'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''

export const storageBucket =
  process.env.SUPABASE_STORAGE_BUCKET ?? 'projects-images'

const UPLOADS_DIR = join(process.cwd(), 'public', 'uploads', 'projects')

function hasSupabaseStorage(): boolean {
  return Boolean(supabaseUrl && serviceRoleKey)
}

export function getSupabaseAdmin() {
  if (!supabaseUrl || !serviceRoleKey) {
    return null
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

export function getPublicStorageUrl(key: string): string {
  if (hasSupabaseStorage()) {
    const base = supabaseUrl.replace(/\/$/, '')
    return `${base}/storage/v1/object/public/${storageBucket}/${key}`
  }
  return `/uploads/projects/${key}`
}

export async function uploadProjectImage(
  file: File,
  filename: string,
): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer())
  const ext = file.name.split('.').pop() ?? 'jpg'
  const safeName = `${filename.replace(/[^a-zA-Z0-9\u0600-\u06FF\u0750-\u077F.-]/g, '_')}.${ext}`

  if (hasSupabaseStorage()) {
    const key = `projects/${Date.now()}-${safeName}`
    const supabase = getSupabaseAdmin()!
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

  const localName = `${Date.now()}-${safeName}`
  await mkdir(UPLOADS_DIR, { recursive: true })
  await writeFile(join(UPLOADS_DIR, localName), buffer)
  return getPublicStorageUrl(localName)
}

export async function deleteProjectImageByUrl(imageUrl: string): Promise<void> {
  if (!imageUrl) return

  const localPrefix = '/uploads/projects/'
  const remotePrefix = `/storage/v1/object/public/${storageBucket}/`

  if (imageUrl.includes(localPrefix)) {
    const filename = imageUrl.slice(imageUrl.indexOf(localPrefix) + localPrefix.length)
    if (!filename) return
    try {
      await unlink(join(UPLOADS_DIR, filename))
    } catch {
      // file may already be deleted or doesn't exist
    }
    return
  }

  if (imageUrl.includes(remotePrefix)) {
    const supabase = getSupabaseAdmin()
    if (!supabase) return
    const key = imageUrl.slice(imageUrl.indexOf(remotePrefix) + remotePrefix.length)
    await supabase.storage.from(storageBucket).remove([key])
  }
}