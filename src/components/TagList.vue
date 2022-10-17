<script setup lang="ts">
  import { tagConfig } from 'tagConfig'
  import { computed } from "vue"
  // import { getPage } from '~/utils/page'

  const {getTags} = useConfigStore()
  // 获取 Tag 元数据
  const tagsMetaInfo: tagConfig  = getTags()

  // 选中的标签
  let selectTag = $ref('')

  // 获取所有的 tag,并且默认选中第一个
  const tagData:any = computed(() => {
    const keys = Object.keys(tagsMetaInfo)
    selectTag = keys[0]
    return keys
  })

  // 切换选中的标签
  const toggleTag = (tag:string) => {
    selectTag = tag
  }

</script>

<template>
  <h1 class="font-600 text-c-dark pb-4">Tags</h1>
  <div class="flex flex-wrap  space-x-6 mt-4 pb-6 justify-start tags">
    <span class="text-gray-400 font-light  hover:text-c-dark
                transition duration-500 ease-in-out  transform hover:-translate-y-1 hover:scale-110
                cursor-pointer text-base leading-4 display-inline-block
                "
          v-for="tagName in tagData"
          :class="{ activetag: selectTag === tagName }"
          @click="toggleTag(tagName)">
      {{tagName}}
      <span class="tagsCount text-indigo-600">
        {{tagsMetaInfo[tagName].length}}
      </span>
    </span>
  </div>
  <h4 class="hstack space-x-6 text-c-light hover:text-c-dark" v-show="selectTag">
    <div i-carbon:tag-group />
    <span class="ml-3">{{ selectTag }}</span>
  </h4>
  <div
      v-for="(item, index) in tagsMetaInfo[selectTag]"
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

