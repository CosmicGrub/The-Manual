import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { admin } from 'better-auth/plugins'
import { nextCookies } from 'better-auth/next-js'
import { db } from '@/lib/db'

// Self-hosted, local-first, single-household app (see MASTERFILE.md §3.1,
// §3.6) — no email infra, no external identity provider, no public signup.
// `disableSignUp` kills the public /sign-up/email endpoint; new accounts are
// created only via scripts/create-user.ts, a CLI script with no HTTP
// boundary at all — it calls auth.api.createUser() directly in-process, so
// there's no session to check: shell access to the server IS the access
// control, matching "admin is whoever can run a command on this machine."
// The `admin` plugin below exists so that script can call createUser().
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
