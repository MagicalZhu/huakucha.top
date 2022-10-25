<!--
  show blogs component: 博客列表的 layout
-->
<template>
  <main class="flex flex-col min-h-full text-c" p="x-4 t-24 b-6">
    <div class="flex-1 mb-6">
      <Navbar>
        <slot name="navbar"/>
      </Navbar>
      <router-view :blogMap="blogMap"/>
    </div>
    <div className='py-2 flex flex-center justify-center' >
      <button class="bg-dark border-gray-300 text-white rounded-xl py-2 px-3
                    relative inline-flex text-base font-medium
                    dark:bg-gray-5 dark:border-gray-300">
        <div>
          <span class="ml-1 pr-2">More</span>
          <span i-carbon:chevron-right class="text-sm"></span>
        </div>
      </button>
    </div>
    <Footer />
  </main>
</template>

<script setup lang='ts'>

import {getBlogs} from '~/utils/index'
const blogMap = computed(() => getBlogs())

</script>
