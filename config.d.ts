
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
  pageSize: number,
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
    nav: Nav,
    footer:Footer,
    toc: Toc,
    blog: Blog
  }
}

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
    [propsName:string]: tagDetail[]
  }
}
