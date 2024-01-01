<script setup lang="ts">
  import { Blog } from '~/api/blog'
  import { RssData } from 'RssData'

  useCustomTitle('RssM')

  const Blogs = ref<Array<RssData>>([])

  /**
   * TODO add order
   */
  Object.values(Blog).forEach((fn) => {
    fn().then((response) => {
      if(response.data) {
        const data = response.data
        const count = data.items.length
        if (count > 3) {
          data.items = data.items.splice(0,3)
        }
        Blogs.value.push({
          ...response.data,
          count
        })
      }
    })
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
