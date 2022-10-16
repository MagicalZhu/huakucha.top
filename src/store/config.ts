import { acceptHMRUpdate, defineStore } from 'pinia'
import { ThemeConfig } from '~/config/themeConfig'
import {siteConfig} from 'siteConfig'
import {tagConfig} from 'tagConfig'

export const useConfigStore = defineStore('config', () => {
  // state
  const metas = $ref(new Array<any>())
  const themeConfig = $ref(ThemeConfig)

  // getters
  function addRouteMeta(tag: any) {
    metas.push(tag)
  }

  function getRouteMetas() {
    return metas
  }
  function getThemeConfig():siteConfig {
    return themeConfig
  }

  function getTags () {
    const tagMap:tagConfig = {}
    metas.forEach((meta) => {
      // has Tags
      if (meta.frontmatter && meta.frontmatter.tags) {
        const putTagMeta = (tagKey:string, routePath: string,frontmatter:any, publishDate?:string ) => {
          if(!tagMap[tagKey]) {
            tagMap[tagKey] = []
          }
          tagMap[tagKey].push({
            path: routePath,
            date:publishDate,
            frontmatter: {
              tags: frontmatter.tags,
              title: frontmatter.title
            }
          })
        }
        // Tags Array
        if (Array.isArray(meta.frontmatter.tags) && meta.frontmatter.tags.length > 0) {
          meta.frontmatter.tags.forEach((tag: string) => {
            putTagMeta(tag, meta.path, meta.frontmatter, meta.date)
          })
        }
        // Tags String
        if (typeof meta.frontmatter.tags === 'string') {
          putTagMeta(meta.frontmatter.tags, meta.path, meta.frontmatter,meta.date)
        }
      }
    })
    return tagMap
  }

  return {
    addRouteMeta,
    getRouteMetas,
    getThemeConfig,
    getTags
  }
})


if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
