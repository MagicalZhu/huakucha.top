<script setup lang="ts">
  import { formatDate } from "~/utils"
  import { Blog } from '~/api/blog'

  const Blogs = ref([])

  Blog.antfu().then((response) => {
    Blogs.value = response.data.items || []
  })

</script>

<template>
  <main class="not-prose mt-[4em] max-w-[80%]">
    <Tabs default-value="rss-hub-blog">

      <!--Tabs Item-->
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="rss-hub-blog">
          RssHub-博客
        </TabsTrigger>

        <TabsTrigger value="rss-blog">
          RSS-博客
        </TabsTrigger>
      </TabsList>


      <!--Tabs Content-->
      <TabsContent value="rss-hub-blog">
        <Card>
          <CardHeader>
            <CardDescription>
              这里是通过 RssHub 订阅的一些博客文章...
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-2">
            <div v-if="Blogs.length === 0">
              <div class="flex items-center space-x-4">
                <Skeleton class="h-12 w-12 rounded-full" />
                <div class="space-y-2">
                  <Skeleton class="h-4 w-[250px]" />
                  <Skeleton class="h-4 w-[200px]" />
                  <Skeleton class="h-4 w-[120px]" />
                </div>
              </div>
            </div>
            <div v-else>
              <ul>
                <li v-for="blog in Blogs" :key="blog.id" class="flex justify-between gap-x-6 py-3">
                  <a :href="blog.url" target="_blank">
                    <p class="mt-1 truncate leading-5 text-gray-500 max-w-sm md:max-w-lg">{{ blog.title }}</p>
                  </a>
                  <span class="mt-1  leading-5 text-gray-500">
                      {{ formatDate(blog.date_published, true)  }}
                  </span>
                  <!-- <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p class="mt-1  leading-5 text-gray-500">
                      {{ formatDate(blog.date_published, true)  }}
                    </p>
                    <div class="mt-1 flex items-center gap-x-1.5">
                      <div class="flex-none rounded-full bg-emerald-500/20 p-1">
                        <div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </div>
                      <p class="text-xs leading-5 text-gray-500">Online</p>
                    </div>
                  </div> -->
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="rss-blog">
        <Card>
          <CardHeader>
            <CardDescription>
              这里是订阅的一些周刊、文章...
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-2">
            <div v-if="Blogs.length === 0">
              <div class="flex items-center space-x-4">
                <Skeleton class="h-12 w-12 rounded-full" />
                <div class="space-y-2">
                  <Skeleton class="h-4 w-[250px]" />
                  <Skeleton class="h-4 w-[200px]" />
                  <Skeleton class="h-4 w-[120px]" />
                </div>
              </div>
            </div>
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
