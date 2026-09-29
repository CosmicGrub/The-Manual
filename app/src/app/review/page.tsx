import Link from 'next/link'
import { db } from '@/lib/db'
import { resolveQuizQuestionItem } from '@/lib/quizzes'
import { ReviewQueueItem } from '@/components/ReviewQueueItem'
import { getOrCreateDefaultUser } from '@/lib/user'

// Dynamic by nature (today's due set is per-user, per-moment) — this page is
// not statically generated. Offline behavior comes from the service worker's
// navigation strategy (network-first, falls back to the last cached snapshot)
// rather than from SSG, same as the dashboard. See MASTERFILE.md §3.8.
// The explicit directive (not just this comment) is required — without it
// `next build` still attempts to prerender the page at build time, before a
// DB exists in the Docker build stage, and the build fails outright.
export const dynamic = 'force-dynamic'

export default async function ReviewPage() {
  const user = await getOrCreateDefaultUser()
  const due = await db.reviewState.findMany({ where: { userId: user.id, dueAt: { lte: new Date() } }, orderBy: { dueAt: 'asc' } })

  return (
    <main className="space-y-6">
      <header>
        <Link href="/" className="inline-block py-2 text-sm text-neutral-500 hover:underline">
          ← Dashboard
        </Link>
        <h1 className="text-2xl font-semibold mt-1">Today's review</h1>
        <p className="text-neutral-500">{due.length} item{due.length === 1 ? '' : 's'} due, scheduled via SM-2.</p>
      </header>

      {due.length === 0 ? (
        <p className="text-neutral-500">Nothing due right now — come back after finishing a few more lessons.</p>
      ) : (
        <ul className="space-y-3">
          {due.map((item) => (
            <ReviewQueueItem
              key={item.id}
              userId={user.id}
              itemId={item.itemId}
              itemType={item.itemType}
              question={item.itemType === 'quiz_question' ? resolveQuizQuestionItem(item.itemId) : undefined}
            />
          ))}
        </ul>
      )}
    </main>
  )
}
