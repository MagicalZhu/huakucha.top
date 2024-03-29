import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'
import type { UserModule } from './types'
import generatedRoutes from '~pages'
import NProgress from 'nprogress'

import './styles/index.css'

const routes = setupLayouts(generatedRoutes)


// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    if (ctx.isClient) {
      ctx.router.beforeEach(() => {
        NProgress.start()
      })
      ctx.router.afterEach(() => { NProgress.done() })
    }

    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
  },
)
