import { apiFetch } from '@/lib/api-client'
import type { TeamMemberJson } from '@/types'

export async function fetchTeamMembers() {
  return apiFetch<TeamMemberJson[]>('/api/team', { auth: false })
}

export async function fetchTeamMember(id: number) {
  return apiFetch<TeamMemberJson>(`/api/team/${id}`, { auth: true })
}

export async function createTeamMember(data: FormData) {
  return apiFetch<TeamMemberJson>('/api/team', {
    method: 'POST',
    body: data,
    auth: true,
  })
}

export async function updateTeamMember(id: number, data: FormData) {
  return apiFetch<TeamMemberJson>(`/api/team/${id}`, {
    method: 'PUT',
    body: data,
    auth: true,
  })
}

export async function deleteTeamMember(id: number) {
  return apiFetch<void>(`/api/team/${id}`, {
    method: 'DELETE',
    auth: true,
  })
}