<script setup lang="ts">
  import { formatDate } from "~/utils"
  import {getBlogs} from '~/utils/index'
  import {getPageCount, getPage} from '~/utils/page'
  import { BlogType as Blog } from "internal";
  import getVal from 'lodash/get'

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
      const dateStr = 'date-' +ele.date.substring(0, 4)
      blogMap[dateStr] ? blogMap[dateStr].push(ele) : (blogMap[dateStr] = [ele])
    }
    return blogMap
  })

  const authorName = useConfigStore().getThemeConfig().authorName
  const title = useTitle()
  title.value = `${authorName} | posts`

  // TODO add lock
  onBeforeRouteLeave((to, from) => {
    if (getVal(to, 'meta.frontmatter.lock')) {
      if (localStorage.getItem('allow')) return true
      const sign = prompt("Enter the password")
      if (sign == "zyl1995"){
        useStorage('allow', true)
        return true
      }
      return false
    }
    return true
  })

</script>

<template>
  <!-- key is  year string -->
  <div v-for="year in Object.keys(contentData)" :key="year">
    <div class="relative pointer-events-none blogGroup">
      <span class="blogYear">
        {{year.replace('date-', '')}}
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
            <span class="opacity-40 text-sm">
              {{ formatDate(blogItem.date) }}
            </span>
            <div inline-flex float-right>
              <span class="tagName" v-for="tagName in blogItem.tags">
                #{{tagName}}
             </span>
            </div>
          </div>
        </div>
      </router-link>
    </article>
    <blog-item/>
  </div>
  <!--TODO use slot-->
  <div class='ml-10 mr-10'>
    <div class='prose prose-lg m-auto justify-center flex'>
      <button class="border-gray-300 text-gray-300 border-2 rounded-lg border p-1 text-base cursor-pointer mr-4"
              v-if="prev"
              @click="--pageNum">
        <span class="ml-1 pr-1">{{$t('theme.page.prev')}}</span>
      </button>

      <button class="border-gray-300 text-gray-300 border-2 rounded-lg border p-1 text-base cursor-pointer"
              v-if="next"
              @click="++pageNum">
        <span class="ml-1 pr-1">{{$t('theme.page.next')}}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
a.itemLink {
  transition: .2s all ease-out;
  text-decoration: none;
  border-bottom: none!important;
}

.blogItem {
  @apply relative block rounded-xl;
  /*  border config*/
  /*@apply border  border-gray-100 dark:border-gray-600;*/
}
.blogItem:hover {
  background-color: #e3e3e424;
}
.dark .blogItem:hover {
  background-color: #40404024;
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
  @apply top--1rem;
  position: absolute;
  bottom: 5.25rem;
  left: 1.5rem;
  font-size: 6em;
  font-weight: 900;
  opacity: 0.1;
}

.tagName {
  @apply inline  opacity-40 text-xs rounded-md  p-1 bg-gray-200 ml-2 mr-1;
  margin-top: -10px;
  color: #1f1f29;
}

.dark .tagName {
  color: #ffffff;
  background-color: #303034;
}
</style>