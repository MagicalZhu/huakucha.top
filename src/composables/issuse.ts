import { useFetch, UseFetchOptions } from '@vueuse/core'

import { ThemeConfig } from '~/config/themeConfig'
const fetchConfig:UseFetchOptions  = {
  timeout: 5000,
  refetch: true,
  async beforeFetch({ url, options, cancel }) {
    const authToken = ThemeConfig.board?.auth
    if (!authToken)
      cancel()
    options.headers = {
      ...options.headers,
      Authorization: `token${authToken}`,
    }
    return {
      options
    }
  }
}

export function useIssuses() {
  const githubOwner = ThemeConfig.board?.githubOwner
  const repo = ThemeConfig.board?.repo
  const time = new Date().getMilliseconds()
  return useFetch(`https://api.github.com/repos/${githubOwner}/${repo}/issues?t=${time}`, fetchConfig)
}

