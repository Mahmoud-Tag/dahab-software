import { requireAuth } from '@/lib/auth'
import {
  parsePartnershipFormData,
  validatePartnershipForm,
  validationErrorResponse,
} from '@/api/partnerships/parse-form'
import { createPartnership, listPartnerships } from '@/api/partnerships/service'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const partnerships = await listPartnerships()
    return Response.json(partnerships)
  } catch (error) {
    console.error('Partnerships GET error:', error)
    const message =
      process.env.NODE_ENV === 'development'
        ? `Failed to fetch partnerships: ${error instanceof Error ? error.message : 'Unknown error'}`
        : 'Failed to fetch partnerships'
    return Response.json({ message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const auth = await requireAuth(request)
  if (auth instanceof Response) return auth

  try {
    const formData = await request.formData()
    const parsed = parsePartnershipFormData(formData)
    const errors = validatePartnershipForm(parsed)
    if (errors) return validationErrorResponse(errors)

    const partnership = await createPartnership(parsed)
    return Response.json(partnership, { status: 201 })
  } catch (error) {
    console.error('Partnerships POST error:', error)
    const message =
      process.env.NODE_ENV === 'development'
        ? `Failed to create partnership: ${error instanceof Error ? error.message : 'Unknown error'}`
        : 'Failed to create partnership'
    return Response.json({ message }, { status: 500 })
  }
}
