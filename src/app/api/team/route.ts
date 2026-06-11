import { requireAuth } from '@/lib/auth'
import {
  parseTeamMemberFormData,
  uploadTeamMemberImage,
  validateTeamMemberForm,
  validationErrorResponse,
} from '@/api/team/parse-form'
import { listTeamMembers, createTeamMember } from '@/api/team/service'
import { deleteFromCloudinary } from '@/lib/cloudinary'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const members = await listTeamMembers()
    return Response.json(members)
  } catch (error) {
    console.error('Team GET error:', error)
    const message =
      process.env.NODE_ENV === 'development'
        ? `Failed to fetch team: ${error instanceof Error ? error.message : 'Unknown error'}`
        : 'Failed to fetch team'
    return Response.json({ message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const auth = await requireAuth(request)
  if (auth instanceof Response) return auth

  try {
    const formData = await request.formData()
    const parsed = await parseTeamMemberFormData(formData)
    const errors = validateTeamMemberForm(parsed)
    if (errors) return validationErrorResponse(errors)

    const uploaded = await uploadTeamMemberImage(parsed)
    try {
      const member = await createTeamMember(uploaded)
      return Response.json(member, { status: 201 })
    } catch (error) {
      if (uploaded.imagePublicId) await deleteFromCloudinary(uploaded.imagePublicId)
      throw error
    }
  } catch (error) {
    console.error('Team POST error:', error)
    const message =
      process.env.NODE_ENV === 'development'
        ? `Failed to create team member: ${error instanceof Error ? error.message : 'Unknown error'}`
        : 'Failed to create team member'
    return Response.json({ message }, { status: 500 })
  }
}
