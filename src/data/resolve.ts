export type ResolvedStyle = {
  id: string
  pinned: boolean
}

// First paint inlines the same rule: a listed query pins, anything else rolls
// and must not be written back to the address.
export function resolveStyle(ids: readonly string[], query: string | null): ResolvedStyle {
  if (query && ids.includes(query)) return { id: query, pinned: true }
  const index = Math.floor(Math.random() * ids.length)
  return { id: ids[index] ?? "", pinned: false }
}

export function pickRandom(ids: readonly string[], current: string) {
  const pool = ids.filter((id) => id !== current)
  const source = pool.length > 0 ? pool : ids
  const index = Math.floor(Math.random() * source.length)
  return source[index] ?? current
}
