
/**
 * theme perference type
 */
interface Social {
  url: string,
  icon: string
}

interface Nav {
  shell?: string
}

interface Footer {
  copyright?: string
}

interface Blog {
  perPageSize: number,
  // 最近发布文章
  rencentSize: number
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
  category: string
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
    // default: false
    showProject?: boolean,
    projects?: Project[],
    socialList?: Social[]
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

