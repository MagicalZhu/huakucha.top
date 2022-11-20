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
        title: item.title,
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
      <div prose prose-lg mx-auto text-left>
        <article class="rounded-xl border-2 mb-4 mt-4 dark:border-gray-6" v-for="item in contentData">
          <div class="flex items-start">
            <div class="ml-4">
              <!-- title -->
              <h3 class="font-medium sm:text-lg">
                <a :href="item.linkUrl" class="underline-blue decoration-2 underline-dotted underline-offset-4 no-underline" target="_blank">
                  {{item.title}}
                </a>
              </h3>

              <p class="text-sm text-gray-700 line-clamp-2 dark:text-gray-500">
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
                  <a :href="item.authorHome" class="font-medium no-underline hover:text-gray-700" target="_blank">
                    {{item.author}}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
    <div class="flex flex-col items-center">
      <button type="button" class="writeButton">
        <!-- <span i-carbon:add-comment mr-3 text-xl></span> -->
        Write
      </button>
    </div>
    <Footer class="footerRe"></Footer>
  </main>
</template>

<style scoped>
.footerRe {
  margin-top: 2em !important;
}
.writeButton {
  @apply text-white bg-dark-800 hover:bg-dark-400 focus:outline-none;
  @apply font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center;
}

</style>
