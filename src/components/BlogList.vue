<script setup lang="ts">
import { formatDate } from "~/utils"
import {getBlogs} from '~/utils/index'
const blogData = computed(() => getBlogs())

</script>

<template>
  <!-- key is  year string -->
  <div v-for="key in Object.keys(blogData)" :key="key">
    <h3>{{ key }}</h3>
    <div
      v-for="blogItem in blogData[key]"
      :key="blogItem.path"
      class="font-normal my-1 mx-0.5 flex">
      <div class="w-14 h-6 leading-6 opacity-50 text-sm mr-2">
        {{ formatDate(blogItem.date, false) }}
      </div>
      <router-link class="flex-1 !text-c" :to="blogItem.path">
        {{ blogItem.title }}
      </router-link>
    </div>
  </div>
</template>
