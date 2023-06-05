/**
 * 定义收藏博主的类型
 *    Tech: 技术
 *    Share: 分享
 */
type BloggerType = 'Tech' | 'Share'

/**
 * 定义有趣的网站的类型
 *    Dev: 面向开发者
 *    Weekly: 周报
 *    Tool: 工具
 *    Soft: 软件
 */
type WebsiteType = 'Dev' | 'Weekly' | 'Tool' | 'Soft'

/**
 * 定义收藏的文章类型
 *
 *    Tech: 技术型
 *    Tool: 工具型
 *    Life: 生活
 */

type ArticleType = 'Tech' | 'Tool' | 'Life'

type CollectionName = 'CS基础' | '云原生' | 'Java' | 'Spring'

/**
 * 技术类型
 */
type TechLang = 'Js' | 'Java' | 'Rust' | 'Go' | 'Python' | 'C#' | 'Cloud' | 'Middleware'

declare module 'share' {
  /**
   * 社交信息
   */
  export interface Social {
    Personal?: string,
    Github?: string,
    Juejin?:string,
    InfoQ?:string,
    Cnblogs?:string,
    CSDN?:string
  }

  /**
   * 关注的博主、开发者
   */
	export interface Blogger {
		name: string
    // 社交平台信息
    social?: Social,
    // github 地址
		github?: string,
    website?: string,
    // 描述
    desc?: string,
    // 头像
    avatar?: string,
    // 标签
		blogTypes: BloggerType[],
    // 技术类型
    techLangs?: TechLang[]
	}

  /**
   * 有趣的网站
   */
  export interface Website {
    name: string,
    // 网站地址
    linkUrl: string,
    // github 地址
		github?: string,
    icon?:string,
    // 标签
		webTypes: WebsiteType[] | WebsiteType,
  }

  /**
   * 有趣的文章
   */
  export interface Article {
    // 文章标题
    title: string,
    // 地址
    url: string,
    // 作者
    author: string,
    // 标签
		articleTypes: WebsiteType[],
    // 技术类型
    techLangs?: TechLang[]
  }
}
