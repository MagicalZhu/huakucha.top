import dayjs from "dayjs"

type Blog = {
  path: string;
  title: string;
  date: string;
}

export function formatDate(date: string | Date, year = true) {
  return year ? dayjs(date).format("YYYY-MM-DD") : dayjs(date).format("MM-DD")
}

/**
 * @description 获取所有的博客信息
 * TODO 移动到全局变量
 */
export function getBlogs() {
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

  const blogMap: Record<string, Blog[]> = $ref({})

  for (const ele of blogs) {
    const dateStr = ele.date.substring(0, 4)
    blogMap[dateStr] ? blogMap[dateStr].push(ele) : (blogMap[dateStr] = [ele])
  }
  return blogMap
}
