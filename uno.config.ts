import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  // Class-based dark mode: toggling `dark` on <html> flips themes.
  shortcuts: [
    // Terminal-flavored UI primitives — sharp corners, 1px borders, no shadows.
    ['term-frame', 'border border-line bg-elev/60 backdrop-blur-[2px]'],
    ['term-row', 'flex items-center gap-3 py-1.5'],
    ['term-prompt', 'text-accent select-none'],
    ['kbd', 'inline-flex items-center px-1.5 py-0.5 text-[0.72rem] leading-none border border-line text-fg/80 bg-bg-elev/60'],
    ['hover-invert', 'transition-colors duration-150 hover:bg-accent hover:text-bg'],
  ],
  theme: {
    colors: {
      // Phosphor / CRT inspired palette. Single accent, monochrome elsewhere.
      bg: 'rgb(var(--bg) / <alpha-value>)',
      'bg-elev': 'rgb(var(--bg-elev) / <alpha-value>)',
      fg: 'rgb(var(--fg) / <alpha-value>)',
      muted: 'rgb(var(--muted) / <alpha-value>)',
      line: 'rgb(var(--line) / <alpha-value>)',
      accent: 'rgb(var(--accent) / <alpha-value>)',
      warn: 'rgb(var(--warn) / <alpha-value>)',
      // Brand kept for backwards-compat with existing class refs but mapped to accent tones.
      brand: {
        DEFAULT: '#a3e635',
        300: '#bef264',
        500: '#a3e635',
        600: '#84cc16',
      },
    },
    fontFamily: {
      mono: '"Geist Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      sans: '"Geist", "Geist Sans", ui-sans-serif, system-ui, sans-serif',
    },
  },
  presets: [
    presetUno({ dark: 'class' }),
    presetAttributify(),
    presetIcons({
      scale: 1.1,
      warn: true,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        mono: [
          {
            name: 'Geist Mono',
            weights: [400, 500, 600, 700],
          },
          {
            name: 'JetBrains Mono',
            weights: [400, 500, 600],
          },
        ],
        sans: [
          {
            name: 'Geist',
            weights: [400, 500, 600, 700],
          },
        ],
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
