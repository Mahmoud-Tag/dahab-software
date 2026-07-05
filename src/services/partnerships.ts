import { apiFetch } from '@/lib/api-client'
import type { PartnershipJson } from '@/types'

export async function fetchPartnerships() {
  return apiFetch<PartnershipJson[]>('/api/partnerships', { auth: false })
}

export async function fetchPartnership(id: number) {
  return apiFetch<PartnershipJson>(`/api/partnerships/${id}`, { auth: true })
}

export async function createPartnership(data: FormData) {
  return apiFetch<PartnershipJson>('/api/partnerships', {
    method: 'POST',
    body: data,
    auth: true,
  })
}

export async function updatePartnership(id: number, data: FormData) {
  return apiFetch<PartnershipJson>(`/api/partnerships/${id}`, {
    method: 'PUT',
    body: data,
    auth: true,
  })
}

export async function deletePartnership(id: number) {
  return apiFetch<void>(`/api/partnerships/${id}`, {
    method: 'DELETE',
    auth: true,
  })
}
