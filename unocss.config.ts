import {
  defineConfig,
  presetAttributify,
  presetWebFonts,
  presetIcons,
  presetTypography,
  presetWind,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from "unocss";



export default defineConfig({
  shortcuts: [
    ["flex-center", "flex items-center justify-center"],
    ["hstack", "flex items-center"],
    ["vstack", "flex flex-col justify-center"],
    ["border-c", "border-gray-200 dark:border-gray-600"],
    ["border-c-dark", "border-gray-300 dark:border-gray-500"],
    ["bg-c", "bg-white dark:bg-gray-700"],
    ["text-c", "text-gray-800 dark:text-gray-200"],
    ["text-c-light", "text-gray-600 dark:text-gray-300"],
    ["text-c-lighter", "text-gray-400 dark:text-gray-500"],
    ["text-c-dark", "text-black dark:text-white"],
    ["text-c-active", "text-brand dark:text-blue-300"],
    ["nav-item", "hstack space-x-1 text-c-light hover:text-c-dark"],
    [
      "btn",
      "hstack space-x-1 rounded transition-colors decoration-none text-sm !text-c bg-gray-100/90 dark:bg-gray-50/10 hover:(!bg-gray-500 !text-white !no-underline)"
    ],
    ["prose-lg", "lg:text-lg max-w-content"],
  ],
  theme: {
    boxShadow: {
      nav: "0 1px 8px 0 rgba(27, 35, 47, .1)"
    },
    colors: {
      brand: "#1772d0"
    },
    maxWidth: {
      content: "100ch"
    }
  },
  presets: [
    presetUno(),
    /**
     * @see https://windicss.org/posts/v30.html#attributify-mode
     * example
     * <button class="bg-blue-400 hover:bg-blue-500 text-sm text-white font-mono font-light py-2 px-4 rounded border-2
     *                border-blue-200 dark:bg-blue-500 dark:hover:bg-blue-600">
     *   Button
     * </button>
     *  equals t0
     *  <button
     *       bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
     *       text="sm white"
     *       font="mono light"
     *       p="y-2 x-4"
     *       border="2 rounded blue-200">
     *       Button
     *   </button>
     */
    presetAttributify(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'height': '1.2em',
        'width': '1.2em',
        'vertical-align': 'text-bottom',
      }
    }),
    presetTypography(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: "prose prose-lg m-auto text-left".split(" ")
});
