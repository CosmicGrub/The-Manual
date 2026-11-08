'use client'

// UNUSED as of the offline-profile rework (MASTERFILE.md §3.6.4) —
// src/components/RequireProfile.tsx replaces this on both pages that used
// to wrap. Kept in place alongside the rest of the locked-and-hidden Better
// Auth system.

import { useSession } from '@/lib/auth-client'

/**
 * Lesson/checkpoint pages are statically generated (offline-safe, see
 * MASTERFILE.md §3.8) so they can't check a session server-side — content
 * itself stays freely viewable. This wraps the pieces that actually write
 * per-user data (quiz submission, progress, checkpoint submission) and
 * swaps them for a sign-in prompt when there's no session, checked
 * client-side after hydration via Better Auth's session cookie.
 */
export function RequireSession({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession()

  if (isPending) return null
  if (!session) {
    return (
      <p className="text-sm text-neutral-500 border rounded-lg p-4">
        <a href="/login" className="underline font-medium">
          Sign in
        </a>{' '}
        to track your progress and submit this.
      </p>
    )
  }

  return <>{children}</>
}
