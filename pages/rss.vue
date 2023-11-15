<script setup lang="ts">
  import { formatDate } from "~/utils"
import { Amazon } from '~/api/blog'

const AmazonBlog = ref([])

Amazon.aws().then((response) => {
  AmazonBlog.value = response.data.items || []
})

</script>

<template>
  <main class="not-prose">
    <head class="-mb-0.5 flex justify-center space-x-5">
      <h1 class="font-extrabold text-[4em]">RssHub</h1>
    </head>
    <hr class="mt-[2em]"/>
    <ul>
      <li v-for="blog in AmazonBlog" :key="blog.id" class="flex justify-between gap-x-6 py-3">
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
