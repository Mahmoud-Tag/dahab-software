import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { toMessageJson } from '@/utils/serializers'

export async function GET(request: Request) {
  const auth = await requireAuth(request)
  if (auth instanceof Response) return auth

  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return Response.json(messages.map(toMessageJson))
  } catch (error) {
    console.error('Messages GET error:', error)
    const message =
      process.env.NODE_ENV === 'development'
        ? `Failed to fetch messages: ${error instanceof Error ? error.message : 'Unknown error'}`
        : 'Failed to fetch messages'
    return Response.json({ message }, { status: 500 })
  }
}
