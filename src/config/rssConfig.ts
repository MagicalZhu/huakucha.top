class RssConfig {
  public rssData: Array<{
    name:string
    href:string
  }> = []

  public add(name:string, href:string):RssConfig {
    this.rssData.push({
      name,
      href
    })
    return this
  }
}

const createData = () => {
  const config = new RssConfig()
  config.add("阮一峰的科技爱好者周刊","https://www.ruanyifeng.com/blog/atom.xml")
  return config.rssData
}

export const Rss = {
  rssData: createData()
}
