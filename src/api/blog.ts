import request from '~/utils/request'

async function aws () {
  const url = '/amazon/awsblogs.json'
  return await request({
    url,
    method: 'get',
  })
}

export const  Amazon = {
  aws
}
