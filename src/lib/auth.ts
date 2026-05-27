import { createHash, randomBytes } from 'crypto'
import { prisma } from '@/lib/prisma'
import type { User } from '@prisma/client'

const TOKENABLE_TYPE = 'App\\Models\\User'

export function hashToken(plain: string): string {
  return createHash('sha256').update(plain).digest('hex')
}

export async function createAccessToken(userId: number, name = 'admin-token') {
  const plain = randomBytes(40).toString('hex')
  const hashed = hashToken(plain)

  await prisma.personalAccessToken.create({
    data: {
      tokenableType: TOKENABLE_TYPE,
      tokenableId: userId,
      name,
      token: hashed,
      abilities: null,
    },
  })

  return plain
}

export async function revokeCurrentToken(request: Request): Promise<void> {
  const plain = extractBearerToken(request)
  if (!plain) return

  const hashed = hashToken(plain)
  await prisma.personalAccessToken.deleteMany({ where: { token: hashed } })
}

export async function getUserFromRequest(
  request: Request,
): Promise<User | null> {
  const plain = extractBearerToken(request)
  if (!plain) return null

  const hashed = hashToken(plain)
  const record = await prisma.personalAccessToken.findUnique({
    where: { token: hashed },
  })

  if (!record) return null
  if (record.expiresAt && record.expiresAt < new Date()) return null

  const user = await prisma.user.findUnique({ where: { id: record.tokenableId } })
  if (!user) return null

  await prisma.personalAccessToken.update({
    where: { id: record.id },
    data: { lastUsedAt: new Date() },
  })

  return user
}

export function extractBearerToken(request: Request): string | null {
  const header = request.headers.get('authorization')
  if (!header?.startsWith('Bearer ')) return null
  return header.slice(7).trim() || null
}

export function unauthorizedResponse() {
  return Response.json({ message: 'Unauthenticated.' }, { status: 401 })
}

export async function requireAuth(request: Request): Promise<User | Response> {
  const user = await getUserFromRequest(request)
  if (!user) return unauthorizedResponse()
  return user
}

export function toUserJson(user: User) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    email_verified_at: user.emailVerifiedAt,
    created_at: user.createdAt,
    updated_at: user.updatedAt,
  }
}
