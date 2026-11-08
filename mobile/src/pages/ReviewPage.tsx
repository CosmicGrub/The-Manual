import { useEffect, useState } from 'react'
import { getDueReviewItems, type ReviewStateRow } from '../db/repository'
import { resolveQuizQuestionItem } from '../lib/quizzes'
import { ReviewQueueItem } from '../components/ReviewQueueItem'
import { navigate } from '../router'
import type { Profile } from '../db/repository'

export function ReviewPage({ profile }: { profile: Profile }) {
  const [due, setDue] = useState<ReviewStateRow[] | null>(null)

  useEffect(() => {
    getDueReviewItems(profile.id).then(setDue)
  }, [profile.id])

  return (
    <main className="space-y-6 px-4 pb-10">
      <header className="pt-6">
        <button onClick={() => navigate('/')} className="inline-block py-2 text-sm text-neutral-500 hover:underline">
          ← Dashboard
        </button>
        <h1 className="text-2xl font-semibold mt-1">Today's review</h1>
        {due && <p className="text-neutral-500">{due.length} item{due.length === 1 ? '' : 's'} due, scheduled via SM-2.</p>}
      </header>

      {due === null ? null : due.length === 0 ? (
        <p className="text-neutral-500">Nothing due right now — come back after finishing a few more lessons.</p>
      ) : (
        <ul className="space-y-3">
          {due.map((item) => (
            <ReviewQueueItem
              key={item.id}
              profileId={profile.id}
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
