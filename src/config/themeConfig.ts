import { siteConfig } from 'siteConfig'

/**
 * 站点配置信息
 */
export const ThemeConfig: siteConfig = {
  authorName: '花裤衩',
  openChat: false,
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
    auth: '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',
    showTitle: false,
    labels: 'borad'
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
    perPageSize: 6,
  },
  category: {
    perPageSize: 6
  },
  blog: {
    perPageSize: 6,
    rencentSize: 5,
    showNextOrPrev: true
  }
}
