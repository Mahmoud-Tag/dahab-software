import { incrementDownloads } from '@/api/projects/service'

type Params = { params: Promise<{ id: string }> }

export async function POST(_request: Request, { params }: Params) {
  const { id } = await params
  const numId = Number(id)

  try {
    const project = await incrementDownloads(numId)
    return Response.json(project)
  } catch (error) {
    console.error('Download increment error:', error)
    return Response.json({ message: 'Not found' }, { status: 404 })
  }
}
