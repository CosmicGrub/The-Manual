import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { admin } from 'better-auth/plugins'
import { nextCookies } from 'better-auth/next-js'
import { db } from '@/lib/db'

// Self-hosted, local-first, single-household app (see MASTERFILE.md §3.1,
// §3.6) — no email infra, no external identity provider, no public signup.
// `disableSignUp` kills the public /sign-up/email endpoint; new accounts are
// created only via the admin-only route (src/app/api/admin/users/route.ts),
// which calls auth.api.createUser() directly from an authenticated admin
// session — see that file for why this is safe even with disableSignUp on.
export const auth = betterAuth({
  database: prismaAdapter(db, { provider: 'sqlite' }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
  },
  // This app is reached over plain HTTP at whatever LAN IP/hostname the host
  // machine has right now (§3.7) — there's no fixed public domain to set as
  // `baseURL`, and a DHCP-assigned IP makes a static trustedOrigins list a
  // guess. Trust whatever Host the request actually arrived on (the server's
  // own view, set by the HTTP layer from the request line — not the
  // client-controlled Origin header this check exists to validate) rather
  // than a client-supplied value: equivalent to a same-origin check for an
  // app with no legitimate cross-origin caller.
  trustedOrigins: async (request) => {
    const host = request?.headers.get('host')
    return host ? [`http://${host}`, `https://${host}`] : []
  },
  plugins: [
    admin(),
    // Must be last — lets Server Actions actually set the session cookie.
    nextCookies(),
  ],
})
