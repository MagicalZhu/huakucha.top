<script setup lang="ts">
  import { formatDate } from "~/utils"
  import {getBlogs} from '~/utils/index'
  import {getPageCount, getPage} from '~/utils/page'
  import { BlogType as Blog } from "internal";

  // all blogs
  const blogMetaInfo = computed(() => getBlogs())

  // calculate the page number for the blog
  const pageCount = computed<number>(() => {
    return getPageCount(blogMetaInfo.value, 'blog')
  })

  const pageNum = $ref(1)

  const prev = computed(() => {
    return pageNum > 1
  })

  const next = computed(() => {
    return pageNum < pageCount.value
  })

  const contentData = computed(() => {
    const blogMap: Record<string, Blog[]> = $ref({})
    const pageData = getPage(blogMetaInfo.value, pageNum, 'blog')
    for (const ele of pageData) {
      const dateStr = ele.date.substring(0, 4)
      blogMap[dateStr] ? blogMap[dateStr].push(ele) : (blogMap[dateStr] = [ele])
    }
    return blogMap
  })

</script>

<template>
  <!-- key is  year string -->
  <div v-for="key in Object.keys(contentData)" :key="key">
    <div class="relative h20 pointer-events-none">
      <span text="8em"
            class="absolute left-6 bottom-1 font-bold op10 top-1">
        {{key}}
      </span>
    </div>
    <div v-for="blogItem in contentData[key]"
        :key="blogItem.path"
        class="flex"
        items="center"
        m="y-1 x-0.5"
        p="3px">
      <span class="w-14 h-6 leading-6 opacity-50"
            text="base"
            m="r-2">
        {{ formatDate(blogItem.date, false) }}
      </span>
      <router-link class="!text-c"
                  font="normal mono"
                  :to="blogItem.path"
                  style="text-decoration: none;">
        {{ blogItem.title }}
      </router-link>
    </div>
  </div>
  <!-- page -->
  <div class='mt-60 ml-10 mr-10'>
    <div class='prose prose-lg m-auto'>
      <button class="bg-dark border-gray-300 text-white rounded-xl py-2 px-3
                    relative inline-flex text-base font-medium"
              v-if="prev"
              @click="--pageNum">
        <div>
          <span i-carbon:chevron-left class="text-sm"></span>
          <span class="ml-1 pr-2">{{$t('theme.page.prev')}}</span>
        </div>
      </button>

      <button class="bg-dark border-gray-300 text-white rounded-xl py-2 px-3
                    relative inline-flex text-base font-medium float-right"
              v-if="next"
              @click="++pageNum">
        <div>
          <span class="ml-1 pr-2">{{$t('theme.page.next')}}</span>
          <span i-carbon:chevron-right class="text-sm"></span>
        </div>
      </button>
    </div>
  </div>
</template>
