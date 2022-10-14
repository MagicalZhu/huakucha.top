import { acceptHMRUpdate, defineStore } from 'pinia'
import { ThemeConfig } from '~/config/themeConfig'
import {siteConfig} from 'siteConfig'

export const useConfigStore = defineStore('config', () => {
  // state
  const metas = ref(new Array<any>())
  const themeConfig = ref(ThemeConfig)

  // getters
  function addRouteMeta(tag: any) {
    metas.value.push(tag)
  }
  function getRouteMetas() {
    return metas.value
  }
  function getThemeConfig():siteConfig {
    return themeConfig.value
  }

  return {
    addRouteMeta,
    getRouteMetas,
    getThemeConfig
  }
})


if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
