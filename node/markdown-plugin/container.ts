import MarkdownIt from 'markdown-it'
import { RenderRule } from 'markdown-it/lib/renderer'
import Token from 'markdown-it/lib/token'
import container from 'markdown-it-container'

export const containerPlugin = (md: MarkdownIt) => {
  md.use(...createContainer('tip', 'Tip', md))
    .use(...createContainer('info', 'Info', md))
    .use(...createContainer('warning', 'Warning', md))
    .use(...createContainer('danger', 'Danger', md))
    .use(...createContainer('details', 'Details', md))
    .use(container, 'v-pre', {
      render: (tokens: Token[], idx: number) =>
        tokens[idx].nesting === 1 ? `<div v-pre>\n` : `</div>\n`
    })
    .use(container, 'raw', {
      render: (tokens: Token[], idx: number) =>
        tokens[idx].nesting === 1 ? `<div class="vp-raw">\n` : `</div>\n`
    })
}

type ContainerArgs = [typeof container, string, { render: RenderRule }]

function createContainer(
  klass: string,
  defaultTitle: string,
  md: MarkdownIt
): ContainerArgs {
  return [
    container,
    klass,
    {
      render(tokens, idx) {
        const token = tokens[idx]
        const info = token.info.trim().slice(klass.length).trim()
        const iconMap:{[key: string]:String} = {
          'tip': 'i-carbon:idea',
          'info': 'i-carbon:information',
          'warning': 'i-carbon:warning-alt',
          'danger': 'i-carbon:fire',
        }
        const iconClass = iconMap[klass] || ''
        if (token.nesting === 1) {
          const title = md.renderInline(info || defaultTitle)
          if (klass === 'details') {
            return `<details class="${klass} custom-block"><summary>${title}</summary>\n`
          }
          return `<div class="${klass} custom-block"><span ${iconClass}/><span class="custom-block-title">${title}</span>\n`
        } else {
          return klass === 'details' ? `</details>\n` : `</div>\n`
        }
      }
    }
  ]
}
