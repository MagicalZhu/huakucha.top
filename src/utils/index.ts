import dayjs from "dayjs"
import {BlogType as Blog} from 'internal';

export function formatDate(d: string | Date, hasYear: boolean = false) {
  const date = dayjs(d)
  if (!hasYear) {
    return date.format('MMM D')
  }
  return date.format('MMM D , YYYY')
}

export function queryInStringArray(ary: string[] , key:string) {
  return ary.filter((item) => {
    return item.toLowerCase().indexOf(key.toLowerCase()) > -1
  })
}

export function slug(name: string) {
  return name.toLowerCase().replace(/[\s\\\/]+/g, '-')
}

/**
 * @description 获取所有的博客信息
 * TODO 移动到全局变量
 */
export function getBlogs():Blog[] {
  const router = useRouter()
  const blogs: Blog[] = router
    .getRoutes()
    .filter((i: any) => i.meta.layout === "post")
    .map(
      (i: any): Blog => ({
        path: i.path,
        title: i.meta.frontmatter.title,
        tags: i.meta.frontmatter.tags,
        categories: i.meta.frontmatter.categories,
        date: i.meta.date
      })
    )
    .sort((a: Blog, b: Blog) => dayjs(b.date).unix() - dayjs(a.date).unix())
  return blogs
}
