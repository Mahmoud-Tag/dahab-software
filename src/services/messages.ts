import { apiFetch } from '@/lib/api-client'
import type { MessageJson } from '@/types'

export async function fetchMessages() {
  return apiFetch<MessageJson[]>('/api/messages', { auth: true })
}

export async function deleteMessage(id: number) {
  return apiFetch<void>(`/api/messages/${id}`, {
    method: 'DELETE',
    auth: true,
  })
}

export async function submitContact(data: {
  name: string
  email: string
  message: string
}) {
  return apiFetch<{ success: boolean }>('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
