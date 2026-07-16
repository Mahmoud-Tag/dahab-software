import { apiFetch } from '@/lib/api-client'
import type { ProjectJson } from '@/types'

const fallbackProjects: ProjectJson[] = [
  {
    id: 1,
    title: 'منصة تجارة إلكترونية',
    category: 'متجر إلكتروني',
    desc: 'منصة متكاملة للبيع عبر الإنترنت مع بوابات دفع متعددة وتتبع الطلبات.',
    fullDesc: null,
    image: '/portfolio-ecommerce.png',
    tags: ['React', 'Node.js', 'MongoDB'],
    year: '2024',
    type: 'ecommerce',
    language: 'عربي',
    downloads: 0,
    downloadUrl: null,
    websiteUrl: 'https://ecommerce.example.com',
    status: 'live',
    features: ['دفع إلكتروني', 'تتبع الطلبات', 'لوحة تحكم'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    views: 0,
    catIcon: '🛒',
    images: [],
  },
  {
    id: 2,
    title: 'تطبيق إدارة المهام',
    category: 'تطبيق موبايل',
    desc: 'تطبيق ذكي لإدارة المهام والمشاريع مع إشعارات وتقارير أداء.',
    fullDesc: null,
    image: '/portfolio-app.png',
    tags: ['Flutter', 'Firebase', 'Dart'],
    year: '2024',
    type: 'app',
    language: 'عربي',
    downloads: 0,
    downloadUrl: null,
    websiteUrl: null,
    status: 'live',
    features: ['إشعارات ذكية', 'تقارير', 'مشاركة الفريق'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    views: 0,
    catIcon: '📱',
    images: [],
  },
  {
    id: 3,
    title: 'نظام إدارة الموارد',
    category: 'نظام ERP',
    desc: 'نظام متكامل لإدارة الموارد البشرية والمالية والمخزون.',
    fullDesc: null,
    image: '/portfolio-system.png',
    tags: ['Next.js', 'PostgreSQL', 'Prisma'],
    year: '2023',
    type: 'system',
    language: 'عربي',
    downloads: 0,
    downloadUrl: null,
    websiteUrl: null,
    status: 'development',
    features: ['إدارة المخزون', 'تقارير مالية', 'إدارة الموظفين'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    views: 0,
    catIcon: '⚙️',
    images: [],
  },
]


export async function fetchProjects(): Promise<ProjectJson[]> {
  try {
    return await apiFetch<ProjectJson[]>('/api/projects')
  } catch {
    return fallbackProjects
  }
}

export async function fetchAdminProjects(): Promise<ProjectJson[]> {
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
