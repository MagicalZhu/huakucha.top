import Shiki from 'markdown-it-shiki'
import LinkAttributes from 'markdown-it-link-attributes'
// @ts-expect-error missing types
import TOC from 'markdown-it-table-of-contents'
import anchor from 'markdown-it-anchor'
import type MarkdownIt from 'markdown-it'
import { slugify } from '@renovamen/utils'
import sup from 'markdown-it-sup'
import mkcontainer from 'markdown-it-container'
import mark from 'markdown-it-mark'
// import prism from 'markdown-it-prism'



export const installMarkdownPlugins = (md: MarkdownIt) => {
  /**
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
  md.use(mkcontainer)

  /**
   * 代码高亮
   */
  // md.use(prism);

  /**
   * mark标记
   */
  md.use(mark)

  md.use(anchor, {
    slugify,
    permalink: anchor.permalink.linkInsideHeader({
      symbol: '#',
      renderAttrs: () => ({ 'aria-hidden': 'true' }),
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
    includeLevel: [1, 2, 3, 4, 5, 6],
    slugify,
  })
}
