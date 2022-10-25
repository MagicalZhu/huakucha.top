<script setup lang="ts">
import { formatDate } from "~/utils"
import {getBlogs} from '~/utils/index'
const blogData = computed(() => getBlogs())

</script>

<template>
  <!-- key is  year string -->
  <div v-for="key in Object.keys(blogData)" :key="key">
    <div class="relative h20 pointer-events-none">
      <span text="8em"
            class="absolute left-6 bottom-1 font-bold op10">
        {{key}}
      </span>
    </div>
    <div v-for="blogItem in blogData[key]"
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
