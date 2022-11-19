<script setup lang="ts">
import {Board} from 'internal'
import { Ref } from 'vue'
const getIssuses = async() => {
  return await useIssuses().then((res) => JSON.parse(res.json().data.value))
}
const contentData: Ref<Board[]> = ref([])
onBeforeMount(async () => {
  Array.from(await getIssuses()).forEach((item:any) => {
    contentData.value.push({
        boardContent: item.body,
        author: item.user.login,
        time: item.updated_at,
        comments: item.comments,
        linkUrl: item.html_url,
        authorHome: item.user.html_url
      })
    })
})
</script>

<template>
  <main class="flex flex-col min-h-full text-c" p="x-4 t-24 b-6">
    <div class="flex-1 mb-6">
      <Navbar>
        <slot name="navbar"></slot>
      </Navbar>
      <!-- issues -->
      <div prose prose-lg mx-auto text-left font-mono>
        <article class="articleCard" v-for="item in contentData">
          <div class="flex items-start">
            <div class="ml-4">
              <!-- title -->
              <h3 class="font-medium sm:text-lg">
                <a :href="item.linkUrl" class="articleTitle" target="_blank">
                  {{item.boardContent}}
                </a>
              </h3>

              <p class="articleContent">
                {{item.boardContent}}
              </p>
              <div class="mt-2 sm:flex sm:items-center sm:gap-2 min-w-full">
                <div class="flex items-center text-gray-500">
                  <Discussion/>
                  <p class="ml-1 text-xs">{{item.comments}} comments</p>
                </div>
                <div class="flex items-center text-gray-500  ml-2">
                  <TimeIcon />
                  <p class="ml-1 text-xs">{{item.time.substring(0,10)}}</p>
                </div>
                <p class="hidden sm:block sm:text-xs sm:text-gray-500 ml-2">
                  Posted by
                  <a :href="item.authorHome" class="font-medium underline hover:text-gray-700" target="_blank">
                    {{item.author}}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
    <Footer></Footer>
  </main>
</template>

<style scoped>
  .articleCard {
    @apply rounded-xl border-2 mb-4 mt-4 dark:border-gray-6;
  }
  .articleTitle {
    @apply underline-blue decoration-2 underline-dotted underline-offset-4 no-underline;
  }
  .articleContent {
    @apply text-sm text-gray-700 line-clamp-2 dark:text-gray-500 ;
  }

</style>
