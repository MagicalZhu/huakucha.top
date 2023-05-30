
/**
 * 定义收藏界面的对象类型
 */
type BloggerType = 'Dev' | 'Share'

declare module 'share' {
  /**
   * Dev: 开发者
   * Share: 分享
   */
	export interface Blogger {
		name: string
    // github 地址
		github?: string,
    // 个人网站
    website?: string,
    // 标签
		tags: BloggerType[] | BloggerType,
    // 描述
    desc?: string,
    // 头像
    avatar?: string
	}
}
