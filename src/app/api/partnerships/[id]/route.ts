import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { parsePositiveIntParam } from '@/lib/api-validation'
import { deleteFromCloudinary } from '@/lib/cloudinary'
import {
  parsePartnershipFormData,
  uploadPartnershipImage,
  validatePartnershipForm,
  validationErrorResponse,
} from '@/api/partnerships/parse-form'
import {
  getPartnership,
  updatePartnership,
  deletePartnership,
} from '@/api/partnerships/service'

type Params = { params: Promise<{ id: string }> }

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const partnershipId = parsePositiveIntParam(id)
    if (!partnershipId) {
      return Response.json({ message: 'Invalid ID' }, { status: 400 })
    }

    const partnership = await getPartnership(partnershipId)
    if (!partnership) {
      return Response.json({ message: 'Not found' }, { status: 404 })
    }
    return Response.json(partnership)
  } catch (error) {
    console.error('Partnership GET error:', error)
    const message =
      process.env.NODE_ENV === 'development'
        ? `Failed to fetch partnership: ${error instanceof Error ? error.message : 'Unknown error'}`
        : 'Failed to fetch partnership'
    return Response.json({ message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  return handleUpdate(request, params)
}

export async function PATCH(request: NextRequest, { params }: Params) {
  return handleUpdate(request, params)
}

export async function POST(request: NextRequest, { params }: Params) {
  const auth = await requireAuth(request)
  if (auth instanceof Response) return auth

  const formData = await request.formData()
  const method = formData.get('_method')
  if (method === 'PUT' || method === 'PATCH') {
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
    const partnershipId = parsePositiveIntParam(id)
    if (!partnershipId) {
      return Response.json({ message: 'Invalid ID' }, { status: 400 })
    }

    const formData = existingFormData ?? (await request.formData())
    const parsed = parsePartnershipFormData(formData)
    const errors = validatePartnershipForm(parsed)
    if (errors) return validationErrorResponse(errors)

    const uploaded = await uploadPartnershipImage(parsed)
    const partnership = await updatePartnership(partnershipId, uploaded)
    if (!partnership) {
      if (uploaded.imagePublicId) await deleteFromCloudinary(uploaded.imagePublicId)
      return Response.json({ message: 'Not found' }, { status: 404 })
    }
    return Response.json(partnership)
  } catch (error) {
    console.error('Partnership update error:', error)
    const message =
      process.env.NODE_ENV === 'development'
        ? `Failed to update partnership: ${error instanceof Error ? error.message : 'Unknown error'}`
        : 'Failed to update partnership'
    return Response.json({ message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const auth = await requireAuth(request)
  if (auth instanceof Response) return auth

  try {
    const { id } = await params
    const partnershipId = parsePositiveIntParam(id)
    if (!partnershipId) {
      return Response.json({ message: 'Invalid ID' }, { status: 400 })
    }

    const ok = await deletePartnership(partnershipId)
    if (!ok) {
      return Response.json({ message: 'Not found' }, { status: 404 })
    }
    return new Response(null, { status: 204 })
  } catch (error) {
    console.error('Partnership DELETE error:', error)
    const message =
      process.env.NODE_ENV === 'development'
        ? `Failed to delete partnership: ${error instanceof Error ? error.message : 'Unknown error'}`
        : 'Failed to delete partnership'
    return Response.json({ message }, { status: 500 })
  }
}
