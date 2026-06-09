import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { parsePositiveIntParam } from '@/lib/api-validation'

type Params = { params: Promise<{ id: string }> }

export async function DELETE(request: Request, { params }: Params) {
  const auth = await requireAuth(request)
  if (auth instanceof Response) return auth

  try {
    const { id } = await params
    const messageId = parsePositiveIntParam(id)
    if (!messageId) {
      return Response.json({ message: 'Invalid message id' }, { status: 400 })
    }

    const existing = await prisma.message.findUnique({ where: { id: messageId } })
    if (!existing) {
      return Response.json({ message: 'Not found' }, { status: 404 })
    }

    await prisma.message.delete({ where: { id: messageId } })
    return new Response(null, { status: 204 })
  } catch (error) {
    console.error('Message delete error:', error)
    const message =
      process.env.NODE_ENV === 'development'
        ? `Failed to delete message: ${error instanceof Error ? error.message : 'Unknown error'}`
        : 'Failed to delete message'
    return Response.json({ message }, { status: 500 })
  }
}
