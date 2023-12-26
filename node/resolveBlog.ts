import { resolve } from 'path'
import fs from 'fs-extra'
import matter from 'gray-matter'
import dayjs from 'dayjs'
import { readingTime } from '.'

/**
 * 解析博客文件,将博客的布局系统设置为 post, 并且将博客元数据写入 route.meta 中
 */
export const resolveBlogFile = (route: any) => {
  if (!route.path.startsWith('/posts') || route.path === '/posts')
    return

  const path = resolve(__dirname, '..', route.component.slice(1))
  const md = fs.readFileSync(path, 'utf-8')
  const { content, data } = matter(md)

  route.meta = Object.assign(route.meta || {}, {
    path:route.path,
    frontmatter: data,
    layout: 'post',
    date: dayjs(data.date).format('YYYY-MM-DD'),
    readingTime: readingTime(content)
  })
  return route
}

/**
 * 构建博客的链表(按文件的 date 排序)
 */
export const resolveBlogList = (routes: any[]) => {
  const blogs = routes
    .filter((item: any) => item.meta?.layout === 'post' && !item.meta.frontmatter.draft)
    .map((item: any) => ({
      path: item.path,
      title: item.meta.frontmatter.title,
      date: item.meta.date,
    }))
    .sort((a: any, b: any) => dayjs(b.date).unix() - dayjs(a.date).unix())

  return routes.map((item) => {
    const i = blogs.findIndex(blog => blog.path === item.path)

    item.meta = {
      ...item.meta,
      prev: i < blogs.length ? blogs[i + 1] : null,
      next: i > 0 ? blogs[i - 1] : null,
    }
    return item
  })
}
