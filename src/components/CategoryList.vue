<script setup lang="ts">
  import { detailConfig } from 'detailConfig'
  import { computed } from "vue";

  const {getFunc} = useConfigStore()
  // 获取 Category 元数据
  const categoryMap: detailConfig  = getFunc('categories')

  // 选中的标签
  let selectCategory = $ref('')

  // 获取所有的 tag,并且默认选中第一个
  const categoryData:any = computed(() => {
    const keys = Object.keys(categoryMap)
    selectCategory = keys[0]
    return keys
  })

  // 切换选中的标签
  const toggleCategory = (category:string) => {
    selectCategory = category
  }
</script>

<template>
  <h1 class="font-600 text-c-dark pb-4">Categories</h1>
  <div class="flex flex-wrap  space-x-6 mt-4 pb-6 justify-start tags">
    <span class="text-gray-400 font-light  hover:text-c-dark
                transition duration-500 ease-in-out  transform hover:-translate-y-1 hover:scale-110
                cursor-pointer text-base leading-4 display-inline-block
                "
          v-for="categoryName in categoryData"
          :class="{ activetag: selectCategory === categoryName }"
          @click="toggleCategory(categoryName)">
      {{categoryName}}
      <span class="tagsCount text-indigo-600">
        {{categoryMap[categoryName].length}}
      </span>
    </span>
  </div>
  <h4 class="hstack space-x-6 text-c-light hover:text-c-dark" v-show="selectCategory">
    <div i-carbon:folder />
    <span class="ml-3">{{ selectCategory }}</span>
  </h4>
  <div
      v-for="(item, index) in categoryMap[selectCategory]"
      :key="index"
      class="my-1 mx-0.5 flex"
    >
    <router-link class="flex-1 !text-c" :to="item.path">
      {{ item.frontmatter.title }}
    </router-link>
    <div class="leading-6 opacity-50 text-sm mr-2 mb-4">
      {{ item.date }}
    </div>
    </div>

</template>


<style type="text/css" scoped>
  .tags {
    border-bottom: 1px dashed #c7c7c7;
  }
  .tagsCount {
    position: relative;
    top: -8px;
    font-size: 12px !important;
  }
  .activetag {
    color:#111827;
  }
  .article {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 10px;
    color: rgba(156, 163, 175, 1);
    transition: border 0.3s ease, color 0.3s ease;
  }
  .article:hover {
    text-decoration: none;
    color: rgba(0, 0, 0, 1)
  }
</style>

