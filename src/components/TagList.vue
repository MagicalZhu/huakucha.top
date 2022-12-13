<script setup lang="ts">
  import { getPageCount,getPage } from '~/utils/page'
  import { formatDate } from "~/utils"

  const { getFunc } = useConfigStore()
  const tagsMetaInfo = getFunc('tags')

  // 选中的标签
  let selectTag = $ref('')

  // 获取所有的 tag,并且默认选中第一个
  const tagData:any = computed(() => {
    const keys = Object.keys(tagsMetaInfo)
    selectTag = keys[0]
    return keys
  })

  // 获取页数
  const pageCount = computed<number>(() => {
    return getPageCount(tagsMetaInfo[selectTag], 'tag')
  })

  const pageNum = $ref(1)

  const prev = computed(() => {
    return pageNum > 1
  })

  const next = computed(() => {
    return pageNum < pageCount.value
  })

  // 切换选中的标签
  const toggleTag = (tag:string) => {
    selectTag = tag
  }

  const contentData = computed(() => {
    return getPage(tagsMetaInfo[selectTag], pageNum, 'tag')
  })

</script>

<template>
  <div class="tagout">
    <span class="tagContent"
          v-for="tagName in tagData"
          :class="{ activetag: selectTag === tagName }"
          @click="toggleTag(tagName)">
      {{tagName}}
      <span class="tagsCount">
        {{tagsMetaInfo[tagName].length}}
      </span>
    </span>
  </div>
  <!--
  <h4 class="hstack space-x-2 text-c-light hover:text-c-dark" v-show="selectTag">
    <div i-carbon:tag-group />
    <span class="ml-3 font-mono">{{ selectTag }}</span>
  </h4>
  -->
  <div
      v-for="(item, index) in contentData"
      :key="index"
      class="my-2 mx-0.5 flex"
    >
    <router-link class="flex-1 !text-c font-mono" 
                :to="item.path"
                style="border-bottom: none;">
      <span font-bold text-gray-600 font-mono> {{ item.frontmatter.title }}</span>
    </router-link>
    <div class="leading-6 opacity-50 text-sm mr-2 mb-4">
      {{ formatDate(item.date, true) }}
    </div>
  </div>
  <!-- page -->
  <div class='mt-60 ml-10 mr-10'>
    <div class='prose prose-lg m-auto'>
      <button class="btnPrevNext"
              v-if="prev"
              @click="--pageNum">
        <div>
          <span i-carbon:chevron-left class="text-sm"></span>
          <span class="ml-1 pr-2">{{$t('theme.page.prev')}}</span>
        </div>
      </button>

      <button class="btnPrevNext float-right"
              v-if="next"
              @click="++pageNum">
        <div>
          <span class="ml-1 pr-2">{{$t('theme.page.next')}}</span>
          <span i-carbon:chevron-right class="text-sm"></span>
        </div>
      </button>
    </div>
  </div>

</template>


<style scoped>
  .tagout {
    @apply flex flex-wrap  space-x-4 mt-4 pb-5 justify-start;
    @apply  border-gray-300 dark:border-gray-500;
    /*@apply border-b-2 border-dashed ;*/
  }

  .tagContent {
    @apply text-base text-gray-400  dark:text-gray-300 font-light  font-mono;
    @apply transition duration-500 ease-in-out  transform hover:-translate-y-1 hover:scale-110;
    @apply cursor-pointer  leading-4 display-inline-block ;
    padding: 7px;
    padding-left: 12px;
  }

  .tagsCount {
    @apply relative text-base -top-2 -left-1;
    @apply text-indigo-600 dark:text-green-5
  }
  .activetag {
    @apply text-dark dark:text-blue-4 font-500;
    background-color: #f3f3f8;
    border-radius: 6px;
  }

  .dark .activetag {
    background-color: #2e2e2e;
    border-radius: 6px;
  }

  .btnPrevNext {
    @apply bg-dark border-gray-300 text-white rounded-xl py-2 px-3 relative inline-flex text-base font-medium
  }

</style>
