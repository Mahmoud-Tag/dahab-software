const TOKEN_KEY = 'admin_token'

export function getAdminToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEY)
}

export function setAdminToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearAdminToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export function goToLogin() {
  clearAdminToken()
  if (typeof window !== 'undefined') {
    window.location.href = '/admin/login'
  }
}

type ApiOptions = RequestInit & {
  auth?: boolean
  formData?: boolean
}

export async function apiFetch<T = unknown>(
  path: string,
  options: ApiOptions = {},
): Promise<T> {
  const { auth = false, formData = false, headers: initHeaders, ...rest } = options

  const headers = new Headers(initHeaders)
  if (!formData) {
    headers.set('Accept', 'application/json')
    if (rest.body && !(rest.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json')
    }
  } else {
    headers.set('Accept', 'application/json')
  }

  if (auth) {
    const token = getAdminToken()
    if (token) headers.set('Authorization', `Bearer ${token}`)
  }

  const res = await fetch(path, { ...rest, headers })

  if (res.status === 401 && auth) {
    goToLogin()
    throw new Error('Unauthorized')
  }

  if (res.status === 204) {
    return undefined as T
  }

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    const err = new Error(
      (data && typeof data === 'object' && 'message' in data
        ? String(data.message)
        : `Request failed (${res.status})`),
    ) as Error & { status: number; data: unknown }
    err.status = res.status
    err.data = data
    throw err
  }

  return data as T
}
