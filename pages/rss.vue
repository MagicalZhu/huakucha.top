<script setup lang="ts">
  import { Blog } from '~/api/blog'
  import { RssData } from 'RssData'

  useCustomTitle('RssM')

  const Blogs = ref<Array<RssData>>([])

  Object.values(Blog).forEach((fn) => {
    fn().then((response) => {
      if(response.data) {
        Blogs.value.push(response.data)
      }
    })
  })

  Blogs.value.push({
    description: '阮一峰的网络日志',
    title: '阮一峰的网络日志',
    items: [
      {
        content_html: 'string',
        date_published: '2023/1/1',
        id: '科技爱好者周刊（第 283 期）：[年终感想] 没有目的地，向前走',
        title:'科技爱好者周刊（第 283 期）：[年终感想] 没有目的地，向前走没有目的地，向前走',
        url:'https://www.ruanyifeng.com/blog/2023/12/weekly-issue-283.html'
      },
      {
        content_html: 'string',
        date_published: '2023/1/1',
        id: '科技爱好者周刊（第 283 期）：[年终感想] 没有目的地，向前走',
        title:'科技爱好者周刊（第 283 期）：[年终感想] 没有目的地，向前走没有目的地，向前走',
        url:'https://www.ruanyifeng.com/blog/2023/12/weekly-issue-283.html'
      },
      {
        content_html: 'string',
        date_published: '2023/1/1',
        id: '科技爱好者周刊（第 283 期）：[年终感想] 没有目的地，向前走',
        title:'科技爱好者周刊（第 283 期）：[年终感想] 没有目的地，向前走没有目的地，向前走',
        url:'https://www.ruanyifeng.com/blog/2023/12/weekly-issue-283.html'
      },
      {
        content_html: 'string',
        date_published: '2023/1/1',
        id: '科技爱好者周刊（第 283 期）：[年终感想] 没有目的地，向前走',
        title:'科技爱好者周刊（第 283 期）：[年终感想] 没有目的地，向前走没有目的地，向前走',
        url:'https://www.ruanyifeng.com/blog/2023/12/weekly-issue-283.html'
      },
    ]
  })

</script>

<template>
  <main class="not-prose mt-[4em]">
    <Tabs default-value="rss-hub-blog">
      <!--Tabs Item-->
      <TabsList class="grid w-full grid-cols-2">
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
              这里是订阅的一些周刊、文章...
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-2">
            <template v-if="Blogs.length > 0">
              <div v-for="(blog, index) in Blogs" :key="index"
                    class="rounded-md border-neutral-400 p-2 transition-all
                          duration-300 hover:border-neutral-700">
                <p class=" font-bold">{{blog.title}}</p>
                <div class="flex items-center space-x-4" v-for="item in blog.items.splice(0,3)">
                  <!-- <Skeleton class="h-12 w-12 rounded-full" /> -->
                  <div class="flex pt-1">
                    <div class="mr-5">
                      <div v-if="blog.items.length > 0" class="truncate max-w-md">
                        <a target="_blank"
                            class="opacity-50 decoration-slate-400 hover:cursor-pointer"
                            :href="item.url">
                          {{ item.title }}
                        </a>
                      </div>
                    </div>
                    <p class=" text-xs pt-1" v-if="blog.items.length > 0">
                      <span class="opacity-40 mr-4">最近更新:</span>
                      <span class="mr-4">{{ item.date_published }}</span>
                    </p>
                  </div>
                </div>
                <div class="float-right">
                  <router-link to="/" title="more articles...">
                    <span class="text-xs">
                      <span class="text-muted-foreground opacity-40">more</span>
                      <span class="md:i-prime-angle-double-right opacity-70 align-bottom"/>
                    </span>
                  </router-link>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="flex items-center space-x-4">
                <!-- <Skeleton class="h-12 w-12 rounded-full" /> -->
                <div class="space-y-2">
                  <Skeleton class="h-4 w-[250px]" />
                  <Skeleton class="h-4 w-[200px]" />
                  <Skeleton class="h-4 w-[120px]" />
                </div>
              </div>
            </template>
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
