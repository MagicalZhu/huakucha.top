import { siteConfig } from 'siteConfig'

/**
 * 站点配置信息
 */
export const ThemeConfig: siteConfig = {
  authorName: 'Athu',
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
  footer: {
    copyright: `© YuLiang Zhu 2022-${new Date().getFullYear()} & 花开堪折直须折.`
  },
  toc: {
    isTocOpen: false,
  },
  tag: {
    perPageSize: 10,
  },
  category: {
    perPageSize: 10
  },
  blog: {
    perPageSize: 10,
    recentPost: 5,
    showNextOrPrev: false
  }
}
