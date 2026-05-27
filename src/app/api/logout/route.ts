import { revokeCurrentToken } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    await revokeCurrentToken(request)
    return new Response(null, { status: 204 })
  } catch (error) {
    console.error('Logout error:', error)
    const message =
      process.env.NODE_ENV === 'development'
        ? `Failed to logout: ${error instanceof Error ? error.message : 'Unknown error'}`
        : 'Failed to logout'
    return Response.json({ message }, { status: 500 })
  }
}
