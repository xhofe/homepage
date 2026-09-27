export type Social = {
  text: string
  label: string
  link: string
  icon: string
}

export type Project = {
  repo: string
  desc: string
  icon: string
}

export const site = {
  name: "Andy Hsu",
  avatar: "https://nn.ci/images/avatar.svg",
  title: "Andy Hsu — Full Stack Developer",
  description: "Andy Hsu — Full Stack developer & open source enthusiast.",
  availability: "Available for collaboration",
  greeting: "Hi, I'm",
  role: "Full Stack",
  degree: "Master",
  quoteLead: "The best time to plant a tree was 20 years ago. The second best time is",
  quoteEm: "now",
  github: "https://github.com/xhofe",
  labels: {
    about: "About",
    social: "Social",
    contributions: "GitHub contributions",
    projects: "Projects",
    skills: "Skills",
    all: "All",
    stacks: "stacks",
    backToTop: "Back to top",
    techStack: "Tech stack",
  },
  socials: [
    { text: "Github", label: "Github", link: "https://github.com/xhofe", icon: "i-ri-github-fill" },
    { text: "Blog", label: "Blog", link: "https://blog.nn.ci", icon: "i-ri-book-2-line" },
    { text: "", label: "Stack Overflow", link: "https://stackoverflow.com/users/10545416/xhofe", icon: "i-jam-stackoverflow" },
    { text: "", label: "Twitter", link: "https://twitter.com/Xh0fe", icon: "i-ri-twitter-fill" },
    { text: "", label: "Bilibili", link: "https://space.bilibili.com/1520762073", icon: "i-ri-bilibili-fill" },
    { text: "", label: "Email", link: "mailto:i@nn.ci", icon: "i-ri-mail-fill" },
    { text: "", label: "Sponsors", link: "https://github.com/sponsors/xhofe", icon: "i-material-icon-theme:github-sponsors" },
  ] satisfies Social[],
  projects: [
    {
      repo: "alist-org/alist",
      desc: "A file list program that supports multiple storage, powered by Gin and Solidjs.",
      icon: "i-twemoji-open-file-folder",
    },
    {
      repo: "xhofe/gh-contributors",
      desc: "⭐ Generate svg of contributors, multiple repo supported",
      icon: "i-twemoji-glowing-star",
    },
    {
      repo: "xhofe/solid-contextmenu",
      desc: "Add a context menu to your solidjs app with ease. Inspired by react-contexify but for Solidjs.",
      icon: "i-twemoji-love-you-gesture-light-skin-tone",
    },
    {
      repo: "xhofe/ipa-renamer",
      desc: "A command line tool for renaming your ipa files quickly and easily.",
      icon: "i-twemoji-hammer-and-wrench",
    },
    {
      repo: "xhofe/aper",
      desc: "A simple music player built with solid.js and howler.js.",
      icon: "i-twemoji-musical-notes",
    },
    {
      repo: "xhofe/solid-iconify",
      desc: "A icon component set for SolidJS using Iconify.",
      icon: "i-twemoji-smiling-face-with-horns",
    },
    {
      repo: "alist-org/alist-web",
      desc: "The front end of Alist V3",
      icon: "i-twemoji:file-folder",
    },
    {
      repo: "xhofe/imgbed",
      desc: "Multi-interface/custom interface file/picture upload",
      icon: "i-twemoji-framed-picture",
    },
    {
      repo: "xhofe/vscode-log-watcher",
      desc: "A VSCode extension for watching log files",
      icon: "i-twemoji:memo",
    },
    {
      repo: "xhofe/vscode-pb-jump",
      desc: "A VSCode extension for jumping between protobuf file and code",
      icon: "i-twemoji:linked-paperclips",
    },
  ] satisfies Project[],
  skills: "astro,bash,devto,discord,docker,electron,git,github,githubactions,go,html,idea,java,js,linux,md,mysql,netlify,nextjs,nginx,nodejs,ps,planetscale,postman,py,pytorch,qt,react,redis,ros,rust,sqlite,stackoverflow,solidjs,svg,tailwind,tauri,threejs,twitter,ts,vercel,vite,vscode,vue,workers,zig".split(","),
  snake: {
    light: "https://jsd.nn.ci/gh/xhofe/xhofe@main/out/github-snake.svg",
    dark: "https://jsd.nn.ci/gh/xhofe/xhofe@main/out/github-snake-dark.svg",
  },
}

export function projectName(repo: string) {
  return repo.split("/")[1] ?? repo
}

export function roleLine() {
  return `${site.role} developer / ${site.degree}'s student.`
}

export function skillSrc(dark: boolean) {
  return `https://skillicons.dev/icons?perline=14&theme=${dark ? "dark" : "light"}&i=${site.skills.join(",")}`
}

export function snakeSrc(dark: boolean) {
  return dark ? site.snake.dark : site.snake.light
}

export function year() {
  return new Date().getFullYear()
}
