import { acceptHMRUpdate, defineStore } from 'pinia'
import { ThemeConfig } from '~/config/themeConfig'
import {siteConfig} from 'siteConfig'
import {tagConfig} from 'tagConfig'
import {categoryConfig} from 'categoryConfig'

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

  function getCategories() {
    const categoryMap:categoryConfig = {}
    metas.forEach((meta) => {
      // has categories
      if (meta.frontmatter && meta.frontmatter.categories) {
        const putCategoryMeta = (categoryKey:string, routePath: string,frontmatter:any, publishDate?:string ) => {
          if(!categoryMap[categoryKey]) {
            categoryMap[categoryKey] = []
          }
          categoryMap[categoryKey].push({
            path: routePath,
            date:publishDate,
            frontmatter: {
              categories: frontmatter.categories,
              title: frontmatter.title
            }
          })
        }
        // Categories Array
        if (Array.isArray(meta.frontmatter.categories) && meta.frontmatter.categories.length > 0) {
          meta.frontmatter.categories.forEach((category: string) => {
            putCategoryMeta(category, meta.path, meta.frontmatter, meta.date)
          })
        }
        // Categories String
        if (typeof meta.frontmatter.categories === 'string') {
          putCategoryMeta(meta.frontmatter.categories, meta.path, meta.frontmatter,meta.date)
        }
      }
    })
    return categoryMap
  }

  return {
    addRouteMeta,
    getRouteMetas,
    getThemeConfig,
    getTags,
    getCategories
  }
})


if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
