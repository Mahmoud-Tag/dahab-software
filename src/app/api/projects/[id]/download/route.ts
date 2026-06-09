import { incrementDownloads } from '@/api/projects/service'
import { parsePositiveIntParam } from '@/lib/api-validation'

type Params = { params: Promise<{ id: string }> }

export async function POST(_request: Request, { params }: Params) {
  const { id } = await params
  const projectId = parsePositiveIntParam(id)
  if (!projectId) {
    return Response.json({ message: 'Invalid project id' }, { status: 400 })
  }

  try {
    const project = await incrementDownloads(projectId)
    return Response.json(project)
  } catch (error) {
    console.error('Download increment error:', error)
    return Response.json({ message: 'Not found' }, { status: 404 })
  }
}
