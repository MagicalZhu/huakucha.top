/**
 * inspired by {@link https://github.com/antfu/markdown-it-shiki}
 * support highlight lines
 */
import { createRequire } from 'module'
import { createSyncFn } from 'synckit'
import type { Highlighter, ILanguageRegistration, IShikiTheme, IThemeRegistration } from 'shiki'
import type MarkdownIt from 'markdown-it'
import JSON5 from 'json5'
import _ from 'lodash'

interface extOptions {
  title?: String,
  highlighLineClass?: string,
  highlines?: number[]
}

export interface DarkModeThemes {
  dark: IThemeRegistration
  light: IThemeRegistration
}

export interface Options {
  theme?: DarkModeThemes
  langs?: ILanguageRegistration[]
  timeout?: number
  highlighter?: Highlighter,
  highlighLineClass?: string
}

function getThemeName(theme: IThemeRegistration) {
  if (typeof theme === 'string')
    return theme
  return (theme as IShikiTheme).name
}

export function resolveOptions(options: Options) {
  let themes: IThemeRegistration[] = []
  let darkModeThemes: DarkModeThemes = {
    light: 'vitesse-light',
    dark: 'vitesse-dark'
  }

  if (!options.theme) {
    themes = themes.concat(['vitesse-light'], 'vitesse-dark')
  }
  else if (typeof options.theme === 'string') {
    themes.push(options.theme)
  }
  else {
    if ('dark' in options.theme || 'light' in options.theme) {
      darkModeThemes = options.theme
      themes.push(options.theme.dark)
      themes.push(options.theme.light)
    }
    else {
      themes.push(options.theme)
    }
  }

  return {
    ...options,
    themes,
    darkModeThemes :{
      dark: getThemeName(darkModeThemes.dark),
      light: getThemeName(darkModeThemes.light),
    }
  }
}

const MarkdownItShiki: MarkdownIt.PluginWithOptions<Options> = (markdownit, options = {}) => {
  const _highlighter = options.highlighter

  const {
    langs,
    themes,
    darkModeThemes,
    highlighLineClass
  } = resolveOptions(options)

  let syncRun: any

  if (!_highlighter) {
    const require = createRequire(import.meta.url)
    syncRun = createSyncFn(require.resolve('./worker.js'))
    syncRun('getHighlighter', { langs, themes })
  }

  const highlightCode = (code: string, lang: string, theme?: string, extOpt?:extOptions): string => {
    if (_highlighter)
      return _highlighter.codeToHtml(code, { lang: lang || 'text', theme })

    return syncRun('codeToHtml', {
      code,
      theme,
      lang: lang || 'text',
    }, extOpt)
  }

  const transLines = (lines:number[]) => {
    let lineData:number[] = []
    lines.forEach((line) => {
      if (Array.isArray(line)) {
        lineData = _.concat(lineData, _.range(line[0], line[1] + 1))
      } else {
        lineData.push(line)
      }
    })
    return _.uniq(lineData)
  }

  markdownit.options.highlight = (code, lang,attr) => {
    let extOptions:extOptions = {}
    if (highlighLineClass) { extOptions.highlighLineClass =  highlighLineClass }
    if(attr) {
      const ext = JSON5.parse(attr)
      if (ext.title) { extOptions.title =  ext.title }
      if (ext.lines) {
        extOptions.highlines =  transLines(ext.lines)
      }
    }
    if (darkModeThemes) {
      const dark =  highlightCode(code, lang, darkModeThemes.dark, extOptions)
        .replace('<pre class="shiki"', '<pre class="shiki shiki-dark" id="codeDark"')
      const light = highlightCode(code, lang || 'text', darkModeThemes.light, extOptions)
        .replace('<pre class="shiki"', '<pre class="shiki shiki-light" id="codeLight"')
      return `<div class="shiki-container">${dark}${light}</div>`
    }
    else {
      return highlightCode(code, lang || 'text')
    }
  }
}

export default MarkdownItShiki
