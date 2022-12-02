import dayjs from "dayjs"
import {BlogType as Blog} from 'internal';

export function formatDate(d: string | Date) {
  const date = dayjs(d)
  if (date.year() === dayjs().year())
    return date.format('MMM D')
  return date.format('MMM D, YYYY')
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
