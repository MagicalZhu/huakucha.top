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
import checkbox from 'markdown-it-checkbox'
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
      dark: 'material-darker',
    }
  })

  /**
   * 复选框
   */
  md.use(checkbox)

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
    level: 1,
    permalink: anchor.permalink.linkInsideHeader({
      symbol: `
        <span class="visually-hidden" aria-hidden="true">
          <svg class="octicon octicon-header" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>
        </span>
      `,
      placement: 'before'
    })
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
    containerHeaderHtml: '<div class="tocHeader">ON THIS PAGE</div>'
  })
}
