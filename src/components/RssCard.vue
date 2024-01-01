<script setup lang="ts">
  import { RssData } from 'RssData'
  defineProps<{
    pageData: Array<RssData>
  }>()

</script>

<template>
  <div v-if="pageData.length > 0">
    <div v-for="(pageInfo, index) in pageData" :key="index"
          class="rounded-md border-neutral-400 p-2 transition-all
                duration-300 hover:border-neutral-700">
      <p class=" font-bold">{{pageInfo.title}}</p>
      <template v-if="pageInfo.items.length > 0">
        <div class="flex items-center space-x-4" v-for="item in pageInfo.items">
          <div class="flex pt-1">
            <div class="mr-5">
              <div v-if="pageInfo.items.length > 0" class="truncate max-w-[18rem] sm:max-w-xl md:max-w-2xl">
                <a target="_blank"
                    class="opacity-50 decoration-slate-400 hover:cursor-pointer"
                    :href="item.url">
                  {{ item.title }}
                </a>
              </div>
            </div>
            <p class="text-xs pt-1 hidden md:flex" v-if="pageInfo.items.length > 0">
              <span class="opacity-40 mr-4">最近更新:</span>
              <span class="mr-4">{{ item.date_published }}</span>
            </p>
          </div>
        </div>
      </template>
      <template v-else>
        No Data...
      </template>
      <div class="float-right mr-8" v-if="pageInfo.count && pageInfo.count > 3">
        <router-link to="/" title="more articles...">
          <span class="text-sm text-muted-foreground opacity-40 underline decoration-gray-400 underline-offset-2 decoration-dashed">more</span>
        </router-link>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="flex items-center space-x-4">
      <!-- <Skeleton class="h-12 w-12 rounded-full" /> -->
      <div class="space-y-2">
        <Skeleton class="h-4 w-[250px]" />
        <Skeleton class="h-4 w-[200px]" />
        <Skeleton class="h-4 w-[120px]" />
      </div>
    </div>
  </div>
</template>
