import shiki from 'shiki'
import { runAsWorker } from 'synckit'

let highlighter
async function handler(command, options, extOptions) {
  const getHighlighterFn = async () => {
    highlighter = await shiki.getHighlighter(options)
  }
  const codeToHtmlFn = async () => {
    const { code, lang, theme } = options
    // default render lang
    let renderLang = 'text'
    const loadedLanguages = highlighter.getLoadedLanguages()
    if (loadedLanguages.includes(lang)) {
      renderLang = lang
    }

    // trans tokens
    const tokens = highlighter.codeToThemedTokens(code, renderLang, theme)
    const html = shiki.renderToHtml(tokens, {
      // custom element renderer
      // pre / code / line / token are available here
      elements: {
        pre({ className, style, children }) {
          const startHtml = `<pre class="${className}">`
          let displayAreaTitle = ''
          if (extOptions && extOptions.title) {
            displayAreaTitle = `<span class="displayAreaTitle">${extOptions.title}</span>`
          }
          const displayArea = `<div style="display:flex;">${displayAreaTitle}<span class="displayArea">${renderLang}</span></div>`
          const endHtml = `${children }</pre>`
          return `${startHtml}${displayArea}${endHtml}`
        },
        // customize line to add highlighpot lines
        line({ className, index, children }) {
          if (extOptions && extOptions.highlines && extOptions.highlines.includes(index + 1)) {
            return `<span class="${ className } ${extOptions.highlighLineClass || 'highlighted-line' }">${ children }</span>`
          }
          if(children !== '') {
            return `<span class="${ className }">${ children }</span>`
          }
        },
      }
    })
    return html
  }
  const cmd = {
    getHighlighter: getHighlighterFn,
    codeToHtml: codeToHtmlFn
  }
  return cmd[command]()
}

runAsWorker(handler)
