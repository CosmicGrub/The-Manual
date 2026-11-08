import { db } from '@/lib/db'
import { ProfilePicker } from '@/components/ProfilePicker'

// Dynamic by nature (the profile list is per-device, read live, same as the
// dashboard) — not statically generated. This is the app's entry point now
// that /login is locked and hidden (see MASTERFILE.md §3.6.4): an
// unselected device lands here, not at a sign-in form.
export const dynamic = 'force-dynamic'

export default async function ProfilesPage() {
  const profiles = await db.profile.findMany({ orderBy: { createdAt: 'asc' } })

  return (
    <main className="max-w-lg mx-auto space-y-8 mt-12">
      <header className="text-center">
        <h1 className="text-2xl font-semibold">The Manual</h1>
        <p className="text-neutral-500 mt-1">Who's using this?</p>
      </header>

      <ProfilePicker profiles={profiles.map((p) => ({ id: p.id, name: p.name, avatar: p.avatar }))} />
    </main>
  )
}
