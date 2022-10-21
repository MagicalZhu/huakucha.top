import {siteConfig} from 'siteConfig'


export const ThemeConfig:siteConfig = {
  authorName: '花裤衩',
  showProject: true,
  comments: {
    isOpen: true,
    config: {
      id: 'comments',
      repo: 'MagicalZhu/vitesseDoc',
      repoId: "R_kgDOH2ZKnw",
      category: 'blog',
      categoryId: 'DIC_kwDOH2ZKn84CSHLe',
      mapping: "pathname",
      reactionsEnabled: "1",
      inputPosition: "top",
      theme: 'light',
      lang: "zh-CN",
      loading: "lazy"
    }
  },
  nav: {
    nutShellContent: 'hi@YuLiang'
  },
  footer: {
    copyright: '© YuLiang Zhu 2022 <br />A dragon lost in human world'
  },
  toc: {
    isTocOpen: true,
  },
  tag: {
    perDisplaSize: 1,
  },
  category: {
    perDisplaSize: 5
  },
  blog: {
    perDisplaSize: 1,
    rencentSize: 5
  }
}
