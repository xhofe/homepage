import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  // transformerDirectives,
  // transformerVariantGroup,
} from 'unocss'


export default defineConfig({
  shortcuts: [
    ['btn', 'text-sm px-4 py-1 rounded inline-block bg-green-600 text-white cursor-pointer hover:bg-green-700 active:bg-green-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        serif: [
          {
            name: 'Noto Serif SC',
            weights: [900],
          },
        ],
      },
    }),
  ],
  transformers: [
    // transformerDirectives(),
    // transformerVariantGroup(),
  ],
})