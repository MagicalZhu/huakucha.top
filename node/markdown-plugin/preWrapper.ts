
import MarkdownIt from 'markdown-it'

export const preWrapperPlugin = (md: MarkdownIt) => {
  const fence = md.renderer.rules.fence!
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args
    const lang = tokens[idx].info.trim().replace(/-vue$/, '')
    const rawCode = fence(...args)
    return `<div class="language-${lang}"><button title="Copy Code" class="copy"></button>${rawCode}</div>`
  }
}
