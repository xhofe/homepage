import type { Scheme, StyleMeta } from "./types"

type MetaModule = { meta: { name: string; scheme: Scheme } }

const metaModules = import.meta.glob<MetaModule>("./*/meta.ts", { eager: true })

function idFromPath(path: string) {
  const parts = path.split("/")
  return parts[parts.length - 2] ?? ""
}

export function getStyles(): StyleMeta[] {
  return Object.entries(metaModules)
    .map(([path, mod]) => ({
      id: idFromPath(path),
      name: mod.meta.name,
      scheme: mod.meta.scheme,
    }))
    .filter((style) => style.id)
    .sort((a, b) => a.name.localeCompare(b.name))
}

export function styleVisibilityCss() {
  const show = getStyles()
    .map((style) => `html[data-style="${style.id}"] [data-style-root="${style.id}"]{display:block;min-height:100vh}`)
    .join("")
  return `[data-style-root]{display:none}${show}`
}
