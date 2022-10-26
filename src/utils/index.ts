import dayjs from "dayjs"
import {BlogType as Blog} from 'internal';

export function formatDate(date: string | Date, year = true) {
  return year ? dayjs(date).format("YYYY-MM-DD") : dayjs(date).format("MM-DD")
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
        date: i.meta.date
      })
    )
    .sort((a: Blog, b: Blog) => dayjs(b.date).unix() - dayjs(a.date).unix())
  return blogs
}
