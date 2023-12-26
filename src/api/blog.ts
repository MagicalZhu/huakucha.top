import request from '~/utils/request'

const jjUserMap = {
  why:'3702810893364350'
}

/**
 * 订阅的博客
 */
async function ruanyifeng () {
  const url = '/blogs/ruanyifeng.json'
  return await request({
    url,
    method: 'get',
  })
}

async function antfu () {
  const url = '/blogs/antfu.json'
  return await request({
    url,
    method: 'get',
  })
}

async function why () {
  const url = `/juejin/posts/${jjUserMap.why}.json`
  return await request({
    url,
    method: 'get',
  })
}

export const  Blog = {
  ruanyifeng,
  antfu,
  why
}
