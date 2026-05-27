import { requireAuth, toUserJson } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const auth = await requireAuth(request)
    if (auth instanceof Response) return auth
    return Response.json(toUserJson(auth))
  } catch (error) {
    console.error('User GET error:', error)
    const message =
      process.env.NODE_ENV === 'development'
        ? `Failed to fetch user: ${error instanceof Error ? error.message : 'Unknown error'}`
        : 'Failed to fetch user'
    return Response.json({ message }, { status: 500 })
  }
}
