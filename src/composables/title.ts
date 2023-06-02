import { useTitle } from '@vueuse/core'
import { ThemeConfig } from '~/config/themeConfig'


export function useCustomTitle(type: string) {
  const authorName = ThemeConfig.authorName
  const title = useTitle()
  title.value = `${type} - ${authorName}`
}
