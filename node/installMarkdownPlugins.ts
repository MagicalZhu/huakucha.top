import Shiki from './markdown-plugin/shiki'
import LinkAttributes from 'markdown-it-link-attributes'
// @ts-expect-error missing types
import TOC from 'markdown-it-table-of-contents'
import anchor from 'markdown-it-anchor'
import type MarkdownIt from 'markdown-it'
import sup from 'markdown-it-sup'
import mark from 'markdown-it-mark'
import uslug from 'uslug'
import { containerPlugin } from './markdown-plugin/container'
// import { preWrapperPlugin } from './markdown-plugin/preWrapper'
const uslugify = (s: string) => uslug(s)


export const installMarkdownPlugins = async (md: MarkdownIt) => {
  /**
   * 代码高亮
   * supports highlight lines and line number
   * @see https://prismjs.com/
  */
  md.use(Shiki, {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    }
  })

  // 上标
  md.use(sup)

  /**
   * @see {@link https://github.com/markdown-it/markdown-it-container}
   * 自定义代码块
   */
  md.use(containerPlugin)

  /**
   * mark标记
   */
  md.use(mark)

  md.use(anchor, {
    slugify: uslugify,
    permalink: anchor.permalink.ariaHidden({
      placement: 'after',
      symbol: '#'
    }),
  })

  md.use(LinkAttributes, {
    matcher: (link: string) => /^https?:\/\//.test(link),
    attrs: {
      target: '_blank',
      rel: 'noopener',
    },
  })

  md.use(TOC, {
    slugify: uslugify,
    includeLevel: [1, 2, 3, 4, 5, 6],
    containerClass: 'table-of-contents',
    containerHeaderHtml: '<div class="containerHeader">CONTENTS</div>'
  })
}
