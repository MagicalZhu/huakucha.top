/**
 * @description PageHelper provides
 */
import chunk from 'lodash/chunk'

type PageType = 'blog' | 'category' | 'tag'

export function getPage(pageData: any[], pageNumber: number ,pageType: PageType):any[]{
  const themeConfig = useConfigStore().getThemeConfig()
  const pageSize:number = themeConfig[pageType].perDisplaSize
  const pageArray = chunk(pageData, pageSize)
  return pageArray[pageNumber - 1] ?? []
}

export function getPageCount(pageData: any[], pageType: PageType):number{
  const themeConfig = useConfigStore().getThemeConfig()
  const pageSize:number = themeConfig[pageType].perDisplaSize
  const pageArray:any[] = chunk(pageData, pageSize)
  return pageArray.length
}
