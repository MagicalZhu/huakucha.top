import  request from '~/utils/request'

async function aws () {
  const url = '/amazon/awsblogs.json'
  return await request({
    url,
    method: 'get',
  })
}

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

export const  Blog = {
  aws,
  ruanyifeng,
  antfu
}
