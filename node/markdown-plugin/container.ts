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
          'tip': '<svg class="custom-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="currentColor" d="M11 24h10v2H11zm2 4h6v2h-6zm3-26A10 10 0 0 0 6 12a9.19 9.19 0 0 0 3.46 7.62c1 .93 1.54 1.46 1.54 2.38h2c0-1.84-1.11-2.87-2.19-3.86A7.2 7.2 0 0 1 8 12a8 8 0 0 1 16 0a7.2 7.2 0 0 1-2.82 6.14c-1.07 1-2.18 2-2.18 3.86h2c0-.92.53-1.45 1.54-2.39A9.18 9.18 0 0 0 26 12A10 10 0 0 0 16 2z"/></svg>',
          'info': '<svg class="custom-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="currentColor" d="M17 22v-8h-4v2h2v6h-3v2h8v-2h-3zM16 8a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 16 8z"/><path fill="currentColor" d="M16 30a14 14 0 1 1 14-14a14 14 0 0 1-14 14Zm0-26a12 12 0 1 0 12 12A12 12 0 0 0 16 4Z"/></svg>',
          'warning': '<svg class="custom-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2Zm0 26a12 12 0 1 1 12-12a12 12 0 0 1-12 12Z"/><path fill="currentColor" d="M15 8h2v11h-2zm1 14a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 16 22z"/></svg>',
          'danger': '<svg class="custom-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="currentColor" d="M24.832 16.969c-.272-.647-.582-1.38-.883-2.285c-.79-2.369 1.734-4.953 1.758-4.977l-1.414-1.414c-.14.14-3.423 3.478-2.242 7.023c.326.978.652 1.75.938 2.43A9.381 9.381 0 0 1 24 22a6.24 6.24 0 0 1-4.19 5.293a8.52 8.52 0 0 0-2.103-8l-1.044-1.044l-.582 1.357c-1.836 4.284-4.021 6.154-5.306 6.934A5.844 5.844 0 0 1 8 22a9.624 9.624 0 0 1 .929-3.629A11.333 11.333 0 0 0 10 14v-1.778c.874.36 2 1.303 2 3.778v2.603l1.743-1.934c3.112-3.454 2.463-7.567 1.206-10.308A4.486 4.486 0 0 1 18 11h2c0-5.537-4.579-7-7-7h-2l1.2 1.599c.137.185 2.862 3.927 1.353 7.688A4.943 4.943 0 0 0 9 10H8v4a9.624 9.624 0 0 1-.929 3.629A11.333 11.333 0 0 0 6 22c0 3.848 3.823 8 10 8s10-4.152 10-8a11.377 11.377 0 0 0-1.168-5.031ZM12.835 27.526a16.499 16.499 0 0 0 4.367-5.598a6.105 6.105 0 0 1 .257 5.971A11.321 11.321 0 0 1 16 28a10.328 10.328 0 0 1-3.165-.474Z"/></svg>',
        }
        const iconClass = iconMap[klass] || ''
        if (token.nesting === 1) {
          const title = md.renderInline(info || defaultTitle)
          if (klass === 'details') {
            return `<details class="${klass} custom-block"><summary>${title}</summary>\n`
          }
          return `<div class="${klass} custom-block"><div class="custom-icon">${iconClass}<span class="custom-block-title">${title}</span></div>\n`
        } else {
          return klass === 'details' ? `</details>\n` : `</div>\n`
        }
      }
    }
  ]
}
