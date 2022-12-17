import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import generateSitemap from 'vite-ssg-sitemap'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Markdown from 'vite-plugin-vue-markdown'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import Inspect from 'vite-plugin-inspect'
import Unocss from 'unocss/vite'

import {
  resolveBlogFile,
  resolveBlogList,
  installMarkdownPlugins
} from "./node";

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  define: {
    'import.meta.env.__BUILD_TIME__': JSON.stringify(new Date().toISOString()),
  },

  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true,
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('copy')
        }
      }
    }),

    /**
     * @description 基于文件的路由
     * @see https://github.com/hannoeru/vite-plugin-pages
     */
    Pages({
      dirs: [
        { dir: 'pages', baseRoute: '' },
      ],
      extensions: ["vue", "md", "js", "ts"],
      // A function that takes a route and optionally returns a modified route
      // This is useful for augmenting your routes with extra data (e.g. route metadata).
      extendRoute: (route) => resolveBlogFile(route),
      // A function that takes a generated routes and optionally returns a modified generated routes.
      onRoutesGenerated: (routes) => resolveBlogList(routes)
    }),

    /**
     * @description 布局系统
     * @see  https://github.com/JohnCampionJr/vite-plugin-vue-layouts
     */
    Layouts(),

    /**
     * @description API 自动加载 - 直接使用 Composition API 无需引入
     * @see https://github.com/antfu/unplugin-auto-import
     */
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        'vue/macros',
        '@vueuse/head',
        '@vueuse/core',
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/composables',
        'src/store',
      ],
      vueTemplate: true,
    }),

    /**
     * @description 组件自动化加载
     * @see https://github.com/antfu/unplugin-vue-components
     */
    Components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
    }),

    /**
     * @description 高性能且极具灵活性的即时原子化 CSS 引擎, see unocss.config.ts for config
     * @see  https://github.com/antfu/unocss
     */
    Unocss(),

    /**
     * @description
     * @see https://github.com/antfu/vite-plugin-vue-markdown
     * @see https://markdown-it.github.io/markdown-it/
     */
    Markdown({
      // wrapperComponent: 'post',
      headEnabled: true,
      markdownItOptions: {
        quotes: '""\'\'',
      },
      wrapperClasses: 'prose   mx-auto text-left',
      markdownItSetup: (md) => installMarkdownPlugins(md)
    }),

    /**
     * @description
     * @see https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
     */
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [path.resolve(__dirname, 'locales/**')],
    }),
    /**
     * @description  Visit http://host:port/__inspect/ to see the inspector
     * @see https://github.com/antfu/vite-plugin-inspect
     */
    Inspect(),
  ],


  /**
   * @see https://github.com/antfu/vite-ssg
   */
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    onFinished() { generateSitemap() },
  },

  ssr: {
    // TODO: workaround until they support native ESM
    noExternal: ['workbox-window', /vue-i18n/],
  },
})
