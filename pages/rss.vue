<script setup lang="ts">
  // import { Blog } from '~/api/blog'
  import { RssData } from 'RssData'

  useCustomTitle('RssM')

  const Blogs = ref<Array<RssData>>([])

    /*
    Object.values(Blog).forEach((fn) => {
      fn().then((response) => {
        if(response.data) {
          const data = response.data
          if (data.items.length > 3) {
            data.items = data.items.splice(0,3)
          }
          Blogs.value.push({
            ...response.data,
            count: data.items.length
          })
        }
      })
    })
    */

  Blogs.value.push({
    description: '阮一峰的网络日志',
    title: '阮一峰的网络日志',
    items: [
      {
        content_html: 'string',
        date_published: '2023/1/1',
        id: '科技爱好者周刊（第 283 期）：[年终感想] 没有目的地，向前走',
        title:'科技爱好者周刊（第 283 期）：[年终感想] 没有目的地，向前走',
        url:'https://www.ruanyifeng.com/blog/2023/12/weekly-issue-283.html'
      },
      {
        content_html: 'string',
        date_published: '2023/1/1',
        id: '科技爱好者周刊（第 283 期）：[年终感想] 没有目的地，向前走',
        title:'科技爱好者周刊（第 283 期）：[年终感想] 没有目的地，向前走',
        url:'https://www.ruanyifeng.com/blog/2023/12/weekly-issue-283.html'
      },
      {
        content_html: 'string',
        date_published: '2023/1/1',
        id: '科技爱好者周刊（第 283 期）：[年终感想] 没有目的地，向前走',
        title:'科技爱好者周刊（第 283 期）：[年终感想] 没有目的地，向前走',
        url:'https://www.ruanyifeng.com/blog/2023/12/weekly-issue-283.html'
      },
      {
        content_html: 'string',
        date_published: '2023/1/1',
        id: '科技爱好者周刊（第 283 期）：[年终感想] 没有目的地，向前走',
        title:'科技爱好者周刊（第 283 期）：[年终感想] 没有目的地，向前走',
        url:'https://www.ruanyifeng.com/blog/2023/12/weekly-issue-283.html'
      },
    ],
    count: 4
  })

  Blogs.value.push({
    description: '阮一峰的网络日志',
    title: '阮一峰的网络日志',
    items: [
      {
        content_html: 'string',
        date_published: '2023/1/1',
        id: '科技爱好者周刊（第 283 期）：[年终感想] 没有目的地，向前走',
        title:'科技爱好者周刊（第 283 期）：[年终感想] 没有目的地，向前走',
        url:'https://www.ruanyifeng.com/blog/2023/12/weekly-issue-283.html'
      },
      {
        content_html: 'string',
        date_published: '2023/1/1',
        id: '科技爱好者周刊（第 283 期）：[年终感想] 没有目的地，向前走',
        title:'科技爱好者周刊（第 283 期）：[年终感想] 没有目的地，向前走',
        url:'https://www.ruanyifeng.com/blog/2023/12/weekly-issue-283.html'
      }
    ],
    count: 2
  })

</script>

<template>
  <main class="not-prose mt-[4em]">
    <Tabs default-value="rss-hub-blog">
      <!--Tabs Item-->
      <TabsList class="grid grid-cols-2">
        <TabsTrigger value="rss-hub-blog">
          博客
        </TabsTrigger>
        <TabsTrigger value="rss-hub-social">
          社交
        </TabsTrigger>
      </TabsList>

      <!--Tabs Content-->
      <TabsContent value="rss-hub-blog">
        <Card>
          <CardHeader>
            <CardDescription>
              订阅的一些周刊、文章...
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-2">
            <RssCard :page-data="Blogs"/>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>

  </main>
</template>

<route lang="yaml">
  meta:
    layout: rss
</route>

<style scoped>
  hr {
    width: 50px;
    margin-top: 2em !important;
    margin-bottom: 1em !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }
</style>
