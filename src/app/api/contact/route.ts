import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = String(body.name ?? '').trim()
    const email = String(body.email ?? '').trim()
    const message = String(body.message ?? '').trim()

    const errors: Record<string, string[]> = {}
    if (!name) errors.name = ['The name field is required.']
    if (!email) errors.email = ['The email field is required.']
    if (!message) errors.message = ['The message field is required.']
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = ['The email must be a valid email address.']
    }

    if (Object.keys(errors).length) {
      return Response.json(
        { message: 'The given data was invalid.', errors },
        { status: 422 },
      )
    }

    await prisma.message.create({ data: { name, email, message } })
    return Response.json({ success: true })
  } catch (error) {
    console.error('Contact error:', error)
    return Response.json({ message: 'Failed to send message' }, { status: 500 })
  }
}
