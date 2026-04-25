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
  // class-based dark mode: toggling `dark` on <html> flips themes
  shortcuts: [
    ['btn', 'text-sm px-4 py-1 rounded inline-block bg-green-600 text-white cursor-pointer hover:bg-green-700 active:bg-green-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['card-base', 'rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md shadow-sm'],
    ['surface', 'bg-white/60 dark:bg-white/[0.04] border border-black/5 dark:border-white/10 backdrop-blur-md'],
    ['chip', 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-black/10 dark:border-white/15 bg-white/60 dark:bg-white/5 backdrop-blur-md'],
    ['icon-btn', 'inline-flex items-center justify-center w-10 h-10 rounded-full border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5 backdrop-blur-md hover:bg-white dark:hover:bg-white/10 transition-colors'],
  ],
  theme: {
    colors: {
      brand: {
        DEFAULT: '#7c5cff',
        50: '#f3efff',
        100: '#e6dcff',
        200: '#cdb8ff',
        300: '#b194ff',
        400: '#9472ff',
        500: '#7c5cff',
        600: '#6243e6',
        700: '#4d34b4',
        800: '#392682',
        900: '#241854',
      },
    },
  },
  presets: [
    presetUno({ dark: 'class' }),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: [
          {
            name: 'Inter',
            weights: [400, 500, 600, 700, 800],
          },
        ],
        serif: [
          {
            name: 'Noto Serif SC',
            weights: [900],
          },
        ],
        mono: [
          {
            name: 'JetBrains Mono',
            weights: [400, 500, 600],
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
