import { acceptHMRUpdate, defineStore } from 'pinia'
import { ThemeConfig } from '~/config/themeConfig'
import { siteConfig } from 'siteConfig'
import { archiveConfig } from 'archiveConfig'

type queryType = 'tags' | 'categories'

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

  function getFunc(queryType: queryType) {
    const resultMap:archiveConfig= {}

    metas.forEach((meta) => {
      if (meta.frontmatter && meta.frontmatter[queryType]) {
        const putMeta = (key:string, routePath: string,frontmatter:any, publishDate?:string ) => {
          if(!resultMap[key]) {
            resultMap[key] = []
          }
          resultMap[key].push({
            path: routePath,
            date:publishDate,
            frontmatter: {
              categories: frontmatter.categories,
              tags: frontmatter.tags,
              title: frontmatter.title
            }
          })
        }
        if (Array.isArray(meta.frontmatter[queryType]) && meta.frontmatter[queryType].length > 0) {
          meta.frontmatter[queryType].forEach((ele: string) => {
            putMeta(ele, meta.path, meta.frontmatter, meta.date)
          })
        }
        if (typeof meta.frontmatter[queryType] === 'string') {
          putMeta(meta.frontmatter[queryType], meta.path, meta.frontmatter,meta.date)
        }
      }
    })
    return resultMap
  }


  return {
    addRouteMeta,
    getRouteMetas,
    getThemeConfig,
    getFunc
  }
})


if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useConfigStore, import.meta.hot))
