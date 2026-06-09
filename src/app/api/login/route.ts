import { compare } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { createAccessToken, toUserJson } from '@/lib/auth'
import { readJsonBody } from '@/lib/api-validation'

export async function POST(request: Request) {
  try {
    const body = await readJsonBody(request)
    if (body instanceof Response) return body
    if (!body || typeof body !== 'object') {
      return Response.json({ message: 'Invalid JSON body' }, { status: 400 })
    }

    const payload = body as Record<string, unknown>
    const email = String(payload.email ?? '').trim()
    const password = String(payload.password ?? '')

    if (!email || !password) {
      return Response.json(
        {
          message: 'The given data was invalid.',
          errors: {
            email: email ? [] : ['The email field is required.'],
            password: password ? [] : ['The password field is required.'],
          },
        },
        { status: 422 },
      )
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        {
          message: 'The given data was invalid.',
          errors: { email: ['The email must be a valid email address.'] },
        },
        { status: 422 },
      )
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !(await compare(password, user.password))) {
      return Response.json(
        {
          message: 'The given data was invalid.',
          errors: { email: ['بيانات الاعتماد غير صحيحة.'] },
        },
        { status: 422 },
      )
    }

    const token = await createAccessToken(user.id)
    return Response.json({ token, user: toUserJson(user) })
  } catch (error) {
    console.error('Login error:', error)
    return Response.json({ message: 'Server error' }, { status: 500 })
  }
}
