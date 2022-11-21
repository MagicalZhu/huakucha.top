import {siteConfig} from 'siteConfig'

/**
 * 站点配置信息
 */
export const ThemeConfig:siteConfig = {
  authorName: '花裤衩',
  showProject: true,
  comments: {
    isOpen: true,
    config: {
      id: 'comments',
      repo: 'MagicalZhu/vitesseDoc',
      repoId: 'R_kgDOH2ZKnw',
      category: 'blog',
      categoryId: 'DIC_kwDOH2ZKn84CSHLe',
      mapping: "pathname",
      reactionsEnabled: '1',
      inputPosition: 'top',
      lang: 'zh-CN',
      loading: 'lazy'
    }
  },
  board: {
    githubOwner: 'MagicalZhu',
    repo: 'vitesseDoc',
    auth:'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',
    showTitle: false
  },
  nav: {
    shell: 'Hi@YuLiang'
  },
  footer: {
    copyright: '© YuLiang Zhu 2022-Present <br />A Dragon Lost In Human World'
  },
  toc: {
    isTocOpen: false,
  },
  tag: {
    perPageSize: 8,
  },
  category: {
    perPageSize: 5
  },
  blog: {
    author: '花裤衩',
    perPageSize: 10,
    rencentSize: 5,
    showNextOrPrev: false
  }
}
