import { useFetch, UseFetchOptions } from '@vueuse/core'

const {getThemeConfig} = useConfigStore()
const fetchConfig:UseFetchOptions  = {
  timeout: 5000,
  refetch: true,
  async beforeFetch({ url, options, cancel }) {
    const authToken = getThemeConfig().board?.auth
    if (!authToken)
      cancel()
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${authToken}`,
    }
    return {
      options
    }
  }
}

export function useIssuses() {
  const githubOwner = getThemeConfig().board?.githubOwner
  const repo = getThemeConfig().board?.repo
  const time = new Date().getMilliseconds()
  return useFetch(`https://api.github.com/repos/${githubOwner}/${repo}/issues?t=${time}`, fetchConfig)
}

