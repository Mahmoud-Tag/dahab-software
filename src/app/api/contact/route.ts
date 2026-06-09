import { prisma } from '@/lib/prisma'
import { readJsonBody } from '@/lib/api-validation'

export async function POST(request: Request) {
  try {
    const body = await readJsonBody(request)
    if (body instanceof Response) return body
    if (!body || typeof body !== 'object') {
      return Response.json({ message: 'Invalid JSON body' }, { status: 400 })
    }

    const payload = body as Record<string, unknown>
    const name = String(payload.name ?? '').trim()
    const email = String(payload.email ?? '').trim()
    const message = String(payload.message ?? '').trim()

    const errors: Record<string, string[]> = {}
    if (!name) errors.name = ['The name field is required.']
    if (!email) errors.email = ['The email field is required.']
    if (!message) errors.message = ['The message field is required.']
    if (name.length > 120) errors.name = ['The name must not be greater than 120 characters.']
    if (email.length > 254) errors.email = ['The email must not be greater than 254 characters.']
    if (message.length > 5000) errors.message = ['The message must not be greater than 5000 characters.']
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
