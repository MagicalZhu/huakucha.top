import Shiki from 'markdown-it-shiki'
import LinkAttributes from 'markdown-it-link-attributes'
// @ts-expect-error missing types
import TOC from 'markdown-it-table-of-contents'
import anchor from 'markdown-it-anchor'
import type MarkdownIt from 'markdown-it'
import { slugify } from '@renovamen/utils'

export const installMarkdownPlugins = (md: MarkdownIt) => {
  /**
   * @see https://prismjs.com/
  */
  md.use(Shiki, {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  })

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
