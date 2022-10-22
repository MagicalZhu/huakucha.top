<!--
  show blogs component: 博客列表的 layout
-->
<template>
  <main class="flex flex-col min-h-full text-c" p="x-4 t-24 b-6">
    <div class="flex-1 mb-6">
      <Navbar>
        <slot name="navbar"/>
      </Navbar>
      <router-view :blogData="blogMap"/>
    </div>
    <div className='py-2 flex flex-center justify-center' >
      <button className="bg-white border-gray-300 text-gray-500
                  hover:bg-blue-200 relative inline-flex px-4 py-2
                  text-sm font-medium">
        More →
      </button>
    </div>
    <Footer />
  </main>
</template>

<script setup lang='ts'>

import {getBlogs} from '~/utils/index'
const blogMap = computed(() => getBlogs())

</script>
