// Shared, framework-agnostic (no server- or client-only imports) so both the
// profile-creation API route (server-side validation) and ProfilePicker
// (client-side swatches) read the same fixed palette.

export const AVATAR_TOKENS = ['blue', 'amber', 'sage', 'plum', 'coral', 'teal'] as const
export type AvatarToken = (typeof AVATAR_TOKENS)[number]

export const AVATAR_COLORS: Record<AvatarToken, string> = {
  blue: '#2B3A67',
  amber: '#B9790A',
  sage: '#3F6B5A',
  plum: '#6B3F52',
  coral: '#B25B3F',
  teal: '#2A6B6B',
}

export function isAvatarToken(value: unknown): value is AvatarToken {
  return typeof value === 'string' && (AVATAR_TOKENS as readonly string[]).includes(value)
}
