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
      const dateStr = 'date-' +ele.date.substring(0, 4)
      blogMap[dateStr] ? blogMap[dateStr].push(ele) : (blogMap[dateStr] = [ele])
    }
    return blogMap
  })

  useCustomTitle('Posts')

</script>

<template>
  <main class="not-prose">
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
              <span class="opacity-40 text-xs">
                {{ formatDate(blogItem.date) }}
              </span>
              <div class="inline-flex float-right">
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
        <Button class="mr-4"
                v-if="prev"
                @click="--pageNum">
          <span class="i-carbon-arrow-left font-bold"></span>
          <span class="pl-2 font-bold">{{$t('theme.page.prev')}}</span>
        </Button>

        <Button v-if="next"
                @click="++pageNum">
          <span class="pr-2 font-bold">{{$t('theme.page.next')}}</span>
          <span class="i-carbon-arrow-right font-bold"></span>
        </Button>
      </div>
    </div>
  </main>
</template>
