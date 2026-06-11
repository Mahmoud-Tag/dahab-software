import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { parsePositiveIntParam } from '@/lib/api-validation'
import {
  parseTeamMemberFormData,
  uploadTeamMemberImage,
  validateTeamMemberForm,
  validationErrorResponse,
} from '@/api/team/parse-form'
import {
  getTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from '@/api/team/service'
import { deleteFromCloudinary } from '@/lib/cloudinary'

type Params = { params: Promise<{ id: string }> }

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const memberId = parsePositiveIntParam(id)
    if (!memberId) {
      return Response.json({ message: 'Invalid ID' }, { status: 400 })
    }

    const member = await getTeamMember(memberId)
    if (!member) {
      return Response.json({ message: 'Not found' }, { status: 404 })
    }
    return Response.json(member)
  } catch (error) {
    console.error('Team GET error:', error)
    const message =
      process.env.NODE_ENV === 'development'
        ? `Failed to fetch team member: ${error instanceof Error ? error.message : 'Unknown error'}`
        : 'Failed to fetch team member'
    return Response.json({ message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  return handleUpdate(request, params)
}

export async function PATCH() {
  return Response.json({ message: 'Method not allowed' }, { status: 405 })
}

export async function POST(request: NextRequest, { params }: Params) {
  const auth = await requireAuth(request)
  if (auth instanceof Response) return auth

  const formData = await request.formData()
  const method = formData.get('_method')
  if (method === 'PUT') {
    return handleUpdate(request, params, formData, true)
  }
  return Response.json({ message: 'Method not allowed' }, { status: 405 })
}

async function handleUpdate(
  request: NextRequest,
  params: Promise<{ id: string }>,
  existingFormData?: FormData,
  authenticated = false,
) {
  if (!authenticated) {
    const auth = await requireAuth(request)
    if (auth instanceof Response) return auth
  }

  try {
    const { id } = await params
    const memberId = parsePositiveIntParam(id)
    if (!memberId) {
      return Response.json({ message: 'Invalid ID' }, { status: 400 })
    }

    const formData = existingFormData ?? (await request.formData())
    const parsed = await parseTeamMemberFormData(formData)
    const errors = validateTeamMemberForm(parsed)
    if (errors) return validationErrorResponse(errors)

    const uploaded = await uploadTeamMemberImage(parsed)
    const member = await updateTeamMember(memberId, uploaded)
    if (!member) {
      if (uploaded.imagePublicId) await deleteFromCloudinary(uploaded.imagePublicId)
      return Response.json({ message: 'Not found' }, { status: 404 })
    }
    return Response.json(member)
  } catch (error) {
    console.error('Team update error:', error)
    const message =
      process.env.NODE_ENV === 'development'
        ? `Failed to update team member: ${error instanceof Error ? error.message : 'Unknown error'}`
        : 'Failed to update team member'
    return Response.json({ message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const auth = await requireAuth(request)
  if (auth instanceof Response) return auth

  try {
    const { id } = await params
    const memberId = parsePositiveIntParam(id)
    if (!memberId) {
      return Response.json({ message: 'Invalid ID' }, { status: 400 })
    }

    const ok = await deleteTeamMember(memberId)
    if (!ok) {
      return Response.json({ message: 'Not found' }, { status: 404 })
    }
    return new Response(null, { status: 204 })
  } catch (error) {
    console.error('Team DELETE error:', error)
    const message =
      process.env.NODE_ENV === 'development'
        ? `Failed to delete team member: ${error instanceof Error ? error.message : 'Unknown error'}`
        : 'Failed to delete team member'
    return Response.json({ message }, { status: 500 })
  }
}
