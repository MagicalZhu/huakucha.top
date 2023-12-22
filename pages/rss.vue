<script setup lang="ts">
  import { Blog } from '~/api/blog'
  import { RssData } from 'RssData'

  const Blogs = ref<Array<RssData>>([])

  Object.values(Blog).forEach((fn) => {
    fn().then((response) => {
      if(response.data) {
        Blogs.value.push(response.data)
      }
    })
  })
</script>

<template>
  <main class="not-prose mt-[4em]">
    <Tabs default-value="rss-hub-blog">
      <!--Tabs Item-->
      <TabsList class="grid w-full grid-cols-1">
        <TabsTrigger value="rss-hub-blog">
          RssHub-博客
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
                    class="cursor-pointer  rounded-md border-neutral-400 p-2 transition-all
                          duration-300 hover:border-neutral-700">
                <div class="flex items-center space-x-4">
                  <!-- <Skeleton class="h-12 w-12 rounded-full" /> -->
                  <div class="mr-5">
                    <p class=" font-bold">{{blog.title}}</p>
                    <span v-if="blog.items.length > 0">
                      <a target="_blank"
                          class="opacity-50 decoration-slate-400 decoration-dashed underline decoration-[0.1em] underline-offset-[6px]
                                hover:decoration-solid hover:decoration-gray-600"
                          :href="blog.items[0].url">
                        {{ blog.items[0].title }}
                      </a>
                    </span>
                  </div>
                  <p class=" text-xs pt-5" v-if="blog.items.length > 0">
                    <span class="opacity-40 mr-4">最近更新:</span>
                    <span class="mr-4">{{ blog.items[0].date_published }}</span>
                    <span class="text-xs text-muted-foreground opacity-40">more</span>
                    <span class="md:i-prime-angle-double-right opacity-70 align-bottom"/>
                  </p>
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
