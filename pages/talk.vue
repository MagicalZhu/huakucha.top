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
        state: item.state,
        boardContent: item.body,
        author: item.user.login,
        time: item.updated_at,
        comments: item.comments,
        linkUrl: item.html_url,
        authorHome: item.user.html_url,
        labels: item.labels
      })
    })
})
const boardConfig = computed(() => {
  return useConfigStore().getThemeConfig().board
})

useCustomTitle('Talk')

</script>

<template>
  <!-- issues -->
  <div class="not-prose mx-auto text-left" >
    <article class="rounded-xl border-2 pt-3 pb-3 dark:border-gray-6" v-for="item in contentData">
      <div class="flex items-start pt-2">
        <div class="ml-4">
          <!-- title -->
          <h3 class="font-medium sm:text-lg" v-if="boardConfig?.showTitle">
            <a :href="item.linkUrl" class="underline-blue decoration-2 underline-dotted underline-offset-4 no-underline" target="_blank">
              {{item.title}}
            </a>
          </h3>

          <p class="text-sm text-gray-700 line-clamp-2 dark:text-gray-500" v-html="item.boardContent">
          </p>
          <div class="mt-2 sm:flex sm:items-center sm:gap-2 min-w-full">
            <div class="flex items-center text-gray-500">
              <Discussion/>
              <a class="ml-1 text-xs no-underline" :href="item.linkUrl" target="_blank">{{item.comments}} comments</a>
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
            <p class="hidden sm:block sm:text-xs sm:text-gray-500 ml-2" v-for="labelItem in item.labels">
              {{ labelItem.description ? '#' + labelItem.description  : ''  }}
            </p>
          </div>
        </div>
      </div>
    </article>
  </div>
  <!--
  <div class="flex flex-col items-center">
    <button type="button" class="writeButton">
      <span i-carbon:add-alt mr-2></span>
      New
    </button>
  </div>
  <SendMessage/>
  -->
</template>

<route lang="yaml">
  meta:
    layout: talk
</route>

