import { pickRandom } from "../data/resolve"
import type { StyleMeta } from "./types"
import { getStyles } from "./load"

const THEME_KEY = "theme"

function readTheme(): "light" | "dark" {
  try {
    const stored = localStorage.getItem(THEME_KEY)
    if (stored === "light" || stored === "dark") return stored
  } catch {}
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function applyScheme(style: StyleMeta) {
  const root = document.documentElement
  root.dataset.style = style.id
  root.dataset.scheme = style.scheme
  if (style.scheme === "system") {
    const theme = readTheme()
    root.classList.toggle("dark", theme === "dark")
    root.dataset.theme = theme
  } else {
    root.classList.remove("dark")
    delete root.dataset.theme
  }
}

function writeTheme(theme: "light" | "dark") {
  const root = document.documentElement
  root.classList.toggle("dark", theme === "dark")
  root.dataset.theme = theme
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {}
}

function urlWithStyle(id: string | null) {
  const url = new URL(location.href)
  if (id) url.searchParams.set("style", id)
  else url.searchParams.delete("style")
  const qs = url.searchParams.toString()
  return qs ? `${url.pathname}?${qs}` : url.pathname
}

export function boot() {
  const flag = "__styleBooted"
  const host = window as unknown as Record<string, boolean>
  if (host[flag]) return
  host[flag] = true

  const styles = getStyles()
  const byId = new Map(styles.map((style) => [style.id, style]))
  const label = document.getElementById("style-toggle")
  const menu = document.getElementById("style-menu")
  const themeBtn = document.getElementById("theme-toggle")
  if (!label || !menu || !themeBtn || styles.length === 0) return

  if ("startViewTransition" in document) document.documentElement.classList.add("vt-supported")

  const params = new URLSearchParams(location.search)
  const query = params.get("style")
  if (query && !byId.has(query)) history.replaceState(null, "", urlWithStyle(null))

  let currentId = document.documentElement.dataset.style ?? ""
  if (!byId.has(currentId)) currentId = styles[0].id

  const setLabel = (style: StyleMeta) => {
    label.textContent = style.name
    label.setAttribute("aria-label", style.name)
  }

  const markCurrent = () => {
    for (const item of menu.querySelectorAll<HTMLButtonElement>("[data-style-id]")) {
      const on = item.dataset.styleId === currentId
      item.classList.toggle("font-bold", on)
      if (on) item.setAttribute("aria-current", "true")
      else item.removeAttribute("aria-current")
    }
  }

  const closeMenu = () => {
    menu.hidden = true
    label.setAttribute("aria-expanded", "false")
  }

  const openMenu = () => {
    menu.hidden = false
    label.setAttribute("aria-expanded", "true")
  }

  const show = (id: string) => {
    const style = byId.get(id)
    if (!style) return
    applyScheme(style)
    currentId = id
    setLabel(style)
    markCurrent()
  }

  const randomBtn = document.createElement("button")
  randomBtn.type = "button"
  randomBtn.className = "block w-full cursor-pointer rounded-lg border-0 bg-transparent px-2.5 py-2 text-left text-inherit hover:bg-brand/15"
  randomBtn.role = "menuitem"
  randomBtn.textContent = "随机"
  randomBtn.addEventListener("click", () => {
    closeMenu()
    const next = pickRandom(styles.map((style) => style.id), currentId)
    history.replaceState(null, "", urlWithStyle(null))
    show(next)
  })
  menu.append(randomBtn)

  for (const style of styles) {
    const item = document.createElement("button")
    item.type = "button"
    item.className = "block w-full cursor-pointer rounded-lg border-0 bg-transparent px-2.5 py-2 text-left text-inherit hover:bg-brand/15"
    item.role = "menuitem"
    item.dataset.styleId = style.id
    item.textContent = style.name
    item.addEventListener("click", () => {
      closeMenu()
      history.replaceState(null, "", urlWithStyle(style.id))
      show(style.id)
    })
    menu.append(item)
  }

  label.addEventListener("click", () => {
    if (menu.hidden) openMenu()
    else closeMenu()
  })

  document.addEventListener("click", (event) => {
    const target = event.target
    if (!(target instanceof Element)) return
    const top = target.closest(".js-top")
    if (top) {
      event.preventDefault()
      const behavior = matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      top.closest("[data-style-root]")?.querySelector<HTMLElement>("[data-scroll]")?.scrollTo({ top: 0, left: 0, behavior })
      window.scrollTo({ top: 0, behavior })
    }
    if (label.contains(target) || menu.contains(target)) return
    closeMenu()
  })

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu()
  })

  themeBtn.addEventListener("click", (event) => {
    if (document.documentElement.dataset.scheme !== "system") return
    const next = document.documentElement.classList.contains("dark") ? "light" : "dark"
    const mouse = event as MouseEvent
    let x = mouse.clientX
    let y = mouse.clientY
    if (x === 0 && y === 0) {
      const rect = themeBtn.getBoundingClientRect()
      x = rect.left + rect.width / 2
      y = rect.top + rect.height / 2
    }
    const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    const apply = () => writeTheme(next)
    if (typeof document.startViewTransition !== "function") {
      apply()
      return
    }
    const transition = document.startViewTransition(apply)
    transition.ready.then(() => {
      const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
      document.documentElement.animate(
        { clipPath: next === "dark" ? clipPath : [...clipPath].reverse() },
        {
          duration: 520,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "forwards",
          pseudoElement: next === "dark" ? "::view-transition-new(root)" : "::view-transition-old(root)",
        },
      )
    })
  })

  const media = matchMedia("(prefers-color-scheme: dark)")
  media.addEventListener?.("change", (event) => {
    if (document.documentElement.dataset.scheme !== "system") return
    try {
      if (localStorage.getItem(THEME_KEY)) return
    } catch {
      return
    }
    writeTheme(event.matches ? "dark" : "light")
  })

  show(currentId)
}
