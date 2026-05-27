import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth'
import {
  parseProjectFormData,
  validateProjectForm,
  validationErrorResponse,
} from '@/api/projects/parse-form'
import {
  deleteProject,
  getProject,
  updateProject,
} from '@/api/projects/service'

type Params = { params: Promise<{ id: string }> }

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params
  const project = await getProject(Number(id))
  if (!project) {
    return Response.json({ message: 'Not found' }, { status: 404 })
  }
  return Response.json(project)
}

export async function PUT(request: NextRequest, { params }: Params) {
  return handleUpdate(request, params)
}

export async function PATCH(request: NextRequest, { params }: Params) {
  return handleUpdate(request, params)
}

export async function POST(request: NextRequest, { params }: Params) {
  const formData = await request.formData()
  const method = formData.get('_method')
  if (method === 'PUT' || method === 'PATCH') {
    return handleUpdate(request, params, formData)
  }
  return Response.json({ message: 'Method not allowed' }, { status: 405 })
}

async function handleUpdate(
  request: NextRequest,
  params: Promise<{ id: string }>,
  existingFormData?: FormData,
) {
  const auth = await requireAuth(request)
  if (auth instanceof Response) return auth

  try {
    const { id } = await params
    const formData = existingFormData ?? (await request.formData())
    const parsed = await parseProjectFormData(formData)
    const errors = validateProjectForm(parsed)
    if (errors) return validationErrorResponse(errors)

    const project = await updateProject(Number(id), parsed)
    if (!project) {
      return Response.json({ message: 'Not found' }, { status: 404 })
    }
    return Response.json(project)
  } catch (error) {
    console.error('Project update error:', error)
    const message =
      process.env.NODE_ENV === 'development'
        ? `Failed to update project: ${error instanceof Error ? error.message : 'Unknown error'}`
        : 'Failed to update project'
    return Response.json({ message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const auth = await requireAuth(request)
  if (auth instanceof Response) return auth

  try {
    const { id } = await params
    const ok = await deleteProject(Number(id))
    if (!ok) {
      return Response.json({ message: 'Not found' }, { status: 404 })
    }
    return new Response(null, { status: 204 })
  } catch (error) {
    console.error('Project delete error:', error)
    const message =
      process.env.NODE_ENV === 'development'
        ? `Failed to delete project: ${error instanceof Error ? error.message : 'Unknown error'}`
        : 'Failed to delete project'
    return Response.json({ message }, { status: 500 })
  }
}
