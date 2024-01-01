interface Footer {
  copyright?: string
}

interface Blog {
  perPageSize: number,
  // 最近发布文章
  recentPost: number,
  showNextOrPrev?: boolean,
  author?: string
}

interface Category {
  perPageSize: number,
}


interface Tag {
  perPageSize: number,
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
    blog: Blog
    category: Category,
    tag: Tag,
    footer:Footer,
  }
}

/**
 * @description theme perference config
 */
declare module 'menuConfig' {
  export interface menuConfig {
    name: string,
    class: string,
    href: string
  }
}

declare module 'RssData' {
  export interface RssDataItem {
    content_html: string,
    date_published: string,
    id: string,
    title:string,
    url:string
  }
  export interface RssData  {
    description: string,
    home_page_url?: string,
    language?:string,
    title: string,
    items: RssDataItem[],
    count?: number
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


