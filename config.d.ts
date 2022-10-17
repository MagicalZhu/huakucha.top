
/**
 * use iconify
 */
interface Social {
  url: string,
  icon: string
}

interface Nav {
  nutShellContent?: string
}

interface Footer {
  copyright?: string
}

interface Blog {
  perDisplaSize: number,
}

interface Category {
  perDisplaSize: number,
}


interface Tag {
  perDisplaSize: number,
}

interface Toc {
  isTocOpen?: boolean
}


/**
 * use iconify
 */
interface Project {
  projectName: string,
  icon: string,
  category: string
}


declare module 'siteConfig' {
  export interface siteConfig {
    authorName: string,
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
 * 标签详细
 */
interface tagDetail {
  path: string,
  date?: string,
  frontmatter: {
    title: string,
    tags: string[] | string
    author?: string
  }
}
declare module 'tagConfig' {
  export interface tagConfig {
    /**
     * propName: The name of the tag
     * tagDetail: tag detail
     */
    [propsName:string]: tagDetail[]
  }
}


/**
 * 类别详细
 */
interface categoryDetail {
  path: string,
  date?: string,
  frontmatter: {
    title: string,
    categories: string[] | string
    author?: string
  }
}

declare module 'categoryConfig' {
  export interface categoryConfig {
    /**
     * propName: The name of the category
     * categoryDetail: category detail
     */
    [propsName:string]: categoryDetail[]
  }
}
