import { apiFetch } from '@/lib/api-client'
import type { ProjectJson } from '@/types'

export async function fetchProjects() {
  return apiFetch<ProjectJson[]>('/api/projects')
}

export async function createProject(formData: FormData) {
  return apiFetch<ProjectJson>('/api/projects', {
    method: 'POST',
    auth: true,
    formData: true,
    body: formData,
  })
}

export async function updateProject(id: number, formData: FormData) {
  return apiFetch<ProjectJson>(`/api/projects/${id}`, {
    method: 'POST',
    auth: true,
    formData: true,
    body: formData,
  })
}

export async function deleteProject(id: number) {
  return apiFetch<void>(`/api/projects/${id}`, {
    method: 'DELETE',
    auth: true,
  })
}

export async function incrementDownload(id: number) {
  return apiFetch<ProjectJson>(`/api/projects/${id}/download`, {
    method: 'POST',
  })
}
