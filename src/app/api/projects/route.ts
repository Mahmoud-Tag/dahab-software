import { requireAuth } from '@/lib/auth'
import {
  parseProjectFormData,
  validateProjectForm,
  validationErrorResponse,
} from '@/api/projects/parse-form'
import { createProject, listProjects } from '@/api/projects/service'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const projects = await listProjects()
    return Response.json(projects)
  } catch (error) {
    console.error('Projects GET error:', error)
    const message =
      process.env.NODE_ENV === 'development'
        ? `Failed to fetch projects: ${error instanceof Error ? error.message : 'Unknown error'}`
        : 'Failed to fetch projects'
    return Response.json({ message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const auth = await requireAuth(request)
  if (auth instanceof Response) return auth

  try {
    const formData = await request.formData()
    const parsed = await parseProjectFormData(formData)
    const errors = validateProjectForm(parsed)
    if (errors) return validationErrorResponse(errors)

    const project = await createProject(parsed)
    return Response.json(project, { status: 201 })
  } catch (error) {
    console.error('Projects POST error:', error)
    const message =
      process.env.NODE_ENV === 'development'
        ? `Failed to create project: ${error instanceof Error ? error.message : 'Unknown error'}`
        : 'Failed to create project'
    return Response.json({ message }, { status: 500 })
  }
}
