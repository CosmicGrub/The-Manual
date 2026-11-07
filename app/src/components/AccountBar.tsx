'use client'

import { useRouter } from 'next/navigation'
import { signOut, useSession } from '@/lib/auth-client'

export function AccountBar() {
  const { data: session, isPending } = useSession()
  const router = useRouter()

  if (isPending) return null

  return (
    <div className="flex justify-end text-sm text-neutral-500 py-2">
      {session ? (
        <span>
          Signed in as {session.user.name}{' '}
          <button
            onClick={() => signOut({ fetchOptions: { onSuccess: () => router.push('/login') } })}
            className="underline"
          >
            Sign out
          </button>
        </span>
      ) : (
        <a href="/login" className="underline">
          Sign in
        </a>
      )}
    </div>
  )
}
