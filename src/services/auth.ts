import { apiFetch, setAdminToken } from '@/lib/api-client'
import type { UserJson } from '@/types'

export async function login(email: string, password: string) {
  const data = await apiFetch<{ token: string; user: UserJson }>('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  setAdminToken(data.token)
  return data
}

export async function logout() {
  try {
    await apiFetch<void>('/api/logout', { method: 'POST', auth: true })
  } catch {
    /* ignore */
  }
}
