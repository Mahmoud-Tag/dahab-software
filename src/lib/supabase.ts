import { createClient } from '@supabase/supabase-js'
import { writeFile, unlink } from 'fs/promises'
import { join } from 'path'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''

export const storageBucket =
  process.env.SUPABASE_STORAGE_BUCKET ?? 'projects-images'

const UPLOADS_DIR = join(process.cwd(), 'public', 'uploads', 'projects')

export function getSupabaseAdmin() {
  if (!supabaseUrl || !serviceRoleKey) {
    return null
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

export function getPublicStorageUrl(filename: string): string {
  return `/uploads/projects/${filename}`
}

export async function uploadProjectImage(
  file: File,
  filename: string,
): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer())
  const ext = file.name.split('.').pop() ?? 'jpg'
  const safeName = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9\u0600-\u06FF\u0750-\u077F.-]/g, '_')}.${ext}`

  await writeFile(join(UPLOADS_DIR, safeName), buffer)

  return getPublicStorageUrl(safeName)
}

export async function deleteProjectImageByUrl(imageUrl: string): Promise<void> {
  if (!imageUrl) return

  let filename: string | null = null

  const localPrefix = '/uploads/projects/'
  const localIdx = imageUrl.indexOf(localPrefix)
  if (localIdx !== -1) {
    filename = imageUrl.slice(localIdx + localPrefix.length)
  } else {
    const remotePrefix = `/storage/v1/object/public/${storageBucket}/`
    const remoteIdx = imageUrl.indexOf(remotePrefix)
    if (remoteIdx !== -1) {
      const supabase = getSupabaseAdmin()
      if (supabase) {
        const key = imageUrl.slice(remoteIdx + remotePrefix.length)
        await supabase.storage.from(storageBucket).remove([key])
        return
      }
    }
  }

  if (!filename) return

  try {
    await unlink(join(UPLOADS_DIR, filename))
  } catch {
    // file may already be deleted or doesn't exist
  }
}