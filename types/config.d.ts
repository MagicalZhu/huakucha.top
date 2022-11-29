interface Nav {
  shell?: string
}

interface Footer {
  copyright?: string
}

interface Blog {
  perPageSize: number,
  // 最近发布文章
  rencentSize: number,
  showNextOrPrev?: boolean,
  author?: string
}

interface Category {
  perPageSize: number,
}


interface Tag {
  perPageSize: number,
}

interface Toc {
  isTocOpen?: boolean
}

interface Project {
  projectName: string,
  icon: string,
  category: string,
}

interface Issues {
  githubOwner: string,
  repo: string,
  auth?:string,
  showTitle: boolean,
  labels?: string
}


/**
 * @description theme perference config
 */
declare module 'siteConfig' {
  export interface siteConfig {
    authorName: string,
    comments: {
      isOpen: boolean,
      config: import('@giscus/vue').GiscusProps
    }
    openChat: boolean,
    board?: Issues,
    showProject?: boolean,
    projects?: Project[],
    toc: Toc
    blog: Blog
    category: Category,
    tag: Tag,
    nav: Nav,
    footer:Footer,
  }
}

/**
 * 标签/类别详细
 */
interface detail {
  path: string,
  date?: string,
  frontmatter: {
    title: string,
    categories: string[] | string
    tags: string[] | string
    author?: string
  }
}
declare module 'archiveConfig' {
  export interface archiveConfig {
    [propsName:string]: detail[]
  }
}

