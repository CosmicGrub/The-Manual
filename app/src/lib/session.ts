import { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'

/** Every mutating/per-user API route derives userId from this, never from the request body/query — closes the IDOR gap where any client could claim to be any userId. */
export async function requireUserId(req: NextRequest): Promise<string | null> {
  const session = await auth.api.getSession({ headers: req.headers })
  return session?.user.id ?? null
}
