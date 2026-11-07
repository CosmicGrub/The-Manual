/**
 * Creates a Better Auth user account directly, bypassing HTTP entirely —
 * this IS the invite-only "admin-provisioned signup" mechanism (public
 * self-signup is disabled, see src/lib/auth.ts). Run by whoever has shell
 * access to the server, for the first account and every household member
 * after it; no email infra, no web admin panel, matching this app's
 * no-external-dependency local-first philosophy (MASTERFILE.md §3.1, §3.6).
 *
 * Usage: npm run create-user -- --email you@example.com --name "Your Name" --role admin
 * (password is prompted interactively, never passed on the command line —
 * shell history and `ps` would otherwise leak it)
 */
import { createInterface } from 'node:readline/promises'
import { stdin, stdout } from 'node:process'
import { auth } from '../src/lib/auth'

function parseArgs() {
  const args: Record<string, string> = {}
  const argv = process.argv.slice(2)
  for (let i = 0; i < argv.length; i++) {
    const flag = argv[i]
    const value = argv[i + 1]
    if (flag?.startsWith('--') && value !== undefined) {
      args[flag.slice(2)] = value
      i++
    }
  }
  return args
}

/** Masked prompt (prints `*` per keystroke) when stdin is a real terminal; falls back to plain readline — e.g. piped input in CI/tests — where raw mode isn't available anyway. */
async function promptPassword(): Promise<string> {
  if (!stdin.isTTY) {
    const rl = createInterface({ input: stdin, output: stdout })
    const password = await rl.question('Password (min 8 chars): ')
    rl.close()
    return password
  }

  return new Promise((resolve, reject) => {
    stdout.write('Password (min 8 chars): ')
    stdin.setRawMode(true)
    stdin.resume()
    stdin.setEncoding('utf8')

    let password = ''
    const onData = (char: string) => {
      switch (char) {
        case '\n':
        case '\r':
        case '\u0004': // Ctrl+D
          stdin.setRawMode(false)
          stdin.pause()
          stdin.removeListener('data', onData)
          stdout.write('\n')
          resolve(password)
          break
        case '\u0003': // Ctrl+C
          stdin.setRawMode(false)
          stdin.pause()
          stdin.removeListener('data', onData)
          stdout.write('\n')
          reject(new Error('cancelled'))
          break
        case '\u007f': // backspace
        case '\b':
          if (password.length > 0) {
            password = password.slice(0, -1)
            stdout.write('\b \b')
          }
          break
        default:
          password += char
          stdout.write('*')
      }
    }
    stdin.on('data', onData)
  })
}

async function main() {
  const { email, name, role } = parseArgs()
  if (!email || !name) {
    console.error('Usage: npm run create-user -- --email you@example.com --name "Your Name" [--role admin]')
    process.exit(1)
  }

  const password = await promptPassword()
  if (password.length < 8) {
    console.error('Password must be at least 8 characters.')
    process.exit(1)
  }

  const result = await auth.api.createUser({
    body: { email, password, name, role: role === 'admin' ? 'admin' : 'user' },
  })

  console.log(`Created ${role === 'admin' ? 'admin ' : ''}user: ${result.user.email} (id: ${result.user.id})`)
}

main().catch((err) => {
  console.error('Failed to create user:', err instanceof Error ? err.message : err)
  process.exit(1)
})
