import { compare } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { createAccessToken, toUserJson } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = String(body.email ?? '').trim()
    const password = String(body.password ?? '')

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
