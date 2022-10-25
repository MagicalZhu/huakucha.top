<script setup lang="ts">
import { formatDate } from "~/utils"
import keys from 'lodash/keys'
import {getBlogs} from '~/utils/index'
// import {getPageCount, getPage} from '~/utils/page'
// import { BlogType as Blog } from "internal";

// the meta info for the blog
const blogMetaInfo = computed(() => getBlogs())

// get allYears from the blog data
const allYears = computed(() => {
  return keys(blogMetaInfo.value)
})

// const allBlogs = computed(() => {
//   let blogs:Blog[] = []
//   keys(blogMetaInfo.value).forEach((key) => {
//     blogs = blogs.concat(blogMetaInfo.value[key])
//   })
//   return blogs
// })

// // calculate the page number for the blog
// const pageCount = computed<number>(() => {
//   return getPageCount(allBlogs.value, 'blog')
// })
// const pageNum = $ref(1)

// // define prev flag
// const prev = computed(() => {
//   return pageNum > 1
// })

// // define nect flag
// const next = computed(() => {
//   return pageNum < pageCount.value
// })


// const contentData = computed(() => {
//   return getPage(allBlogs.value, pageNum, 'blog')
// })

</script>

<template>
  <!-- key is  year string -->
<div v-for="key in allYears" :key="key">
    <div class="relative h20 pointer-events-none">
      <span text="8em"
            class="absolute left-6 bottom-1 font-bold op10">
        {{key}}
      </span>
    </div>
    <div v-for="blogItem in blogMetaInfo[key]"
        :key="blogItem.path"
        class="flex"
        items="center"
        m="y-1 x-0.5">
      <span class="w-14 h-6 leading-6 opacity-50"
            text="base"
            m="r-2">
        {{ formatDate(blogItem.date, false) }}
      </span>
      <router-link class="flex-1 !text-c"
                  font="normal mono"
                  :to="blogItem.path"
                  style="text-decoration: none;">
        {{ blogItem.title }}
      </router-link>
    </div>
  </div>
</template>
