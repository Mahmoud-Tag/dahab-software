export function parsePositiveIntParam(value: string): number | null {
  if (!/^\d+$/.test(value)) return null

  const parsed = Number(value)
  if (!Number.isSafeInteger(parsed) || parsed < 1) return null

  return parsed
}

export async function readJsonBody(request: Request): Promise<unknown | Response> {
  try {
    return await request.json()
  } catch {
    return Response.json({ message: 'Invalid JSON body' }, { status: 400 })
  }
}
