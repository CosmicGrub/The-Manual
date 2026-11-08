'use client'

// UNUSED as of the offline-profile rework (MASTERFILE.md §3.6.4) —
// src/components/ProfileBar.tsx replaces this in layout.tsx. Kept in place
// alongside the rest of the locked-and-hidden Better Auth system.

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
