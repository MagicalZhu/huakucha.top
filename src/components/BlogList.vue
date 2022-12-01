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
  <div v-for="year in Object.keys(contentData)" :key="year">
    <div class="relative pointer-events-none blogGroup">
      <span class="blogYear">
        {{year}}
      </span>
    </div>
    <article v-for="blogItem in contentData[year]"
        :key="blogItem.path"
        class="blogItem">
      <router-link class="itemLink block font-normal no-underline !text-c"
                   font="normal mono"
                  :to="blogItem.path">        
        <div class="card">
          <div>
            <span class="blogTitle">{{ blogItem.title }}</span>
          </div>
          <div>
            <span class="opacity-40 text-sm text-base">
              {{ formatDate(blogItem.date) }}
            </span>
          </div>
        </div>
      </router-link>
    </article>
    <blog-item/>
  </div>
  <!-- TODO page -->
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

<style scoped>
a.itemLink {
  transition: .2s all ease-out;
  text-decoration: none;
  border-bottom: none!important;
  width: fit-content;
}

.blogItem {
  @apply relative block rounded-xl;
  /*  border config*/
  /*@apply border  border-gray-100 dark:border-gray-600;*/
}

.blogTitle {
  @apply font-bold text-gray-600 font-mono;
}

.card {
  @apply: text-gray-500;
  padding: 8px;
}

.blogGroup {
  height: 3em;
}

.blogYear {
  @apply text-8em absolute bottom-1 font-bold op10 top--1rem left-18;
}
</style>