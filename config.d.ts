
interface Nav {
  nutShellContent?: string
}

interface Footer {
  cop?: string
}


interface Toc {
  hiddenDeafult?: boolean
}

declare module 'siteConfig' {
  export interface siteConfig {
    nav: Nav,
    footer:Footer,
    toc: Toc
  }
}