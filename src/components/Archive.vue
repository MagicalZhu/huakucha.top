<!-- 
  tags 和 categories 的 layout
  仅需要传入类型即可
 -->
 <script setup lang="ts">
  import { getPageCount,getPage } from '~/utils/page'
  import { formatDate } from "~/utils"
  import upperFirst from 'lodash/upperFirst'

  type pageType = 'tags' | 'categories'

  type configType = 'tag' | 'category'

  const props = defineProps<{
    pageType: pageType
  }>()

  let queryType:configType = 'tag'

  if (props.pageType === 'tags') {
  queryType = 'tag'
  }

  if (props.pageType === 'categories') {
  queryType = 'category'
  }


  const {getFunc} = useConfigStore()
  // 获取 Tag/Category 元数据
  const metaInfo = getFunc(props.pageType)

  // 选中的标签
  let selectedInfo = $ref('')

  // 获取所有的 tag/category,并且默认选中第一个
  const pageData:any = computed(() => {
   const keys = Object.keys(metaInfo)
   selectedInfo = keys[0]
   return keys
  })

   // 获取页数
  const pageCount = computed<number>(() => {
    return getPageCount(metaInfo[selectedInfo], queryType)
  })

  const pageNum = $ref(1)
  const prev = computed(() => {
    return pageNum > 1
  })
  const next = computed(() => {
    return pageNum < pageCount.value
  })

  // 切换选中的标签
  const toggleSelectedInfo = (info:string) => {
    selectedInfo = info
  }

  const contentData = computed(() => {
    return getPage(metaInfo[selectedInfo], pageNum, queryType)
  })

  useCustomTitle(upperFirst(props.pageType))

</script>

<template>
 <main class="not-prose">
   <div class="itemLayout">
    <span class="itemContent"
          v-for="pageItem in pageData"
          :class="{ isActive: selectedInfo === pageItem }"
          @click="toggleSelectedInfo(pageItem)">
      {{pageItem}}
      <span class="itemCount">
        {{ metaInfo[pageItem].length }}
      </span>
    </span>
   </div>
   <div
       v-for="(item, index) in contentData"
       :key="index"
       class="my-2 mx-0.5 flex"
     >
     <router-link class="flex-1 !text-c font-mono" :to="item.path" style="border-bottom: none;">
       <span font-bold text-gray-600 font-mono> {{ item.frontmatter.title }}</span>
     </router-link>
     <div class="leading-6 opacity-50 text-sm mr-2 mb-4 font-mono">
       {{ formatDate(item.date, true) }}
     </div>
   </div>
   <!-- page -->
   <div class='mt-60 ml-10 mr-10'>
     <div class='prose   mx-auto text-left'>
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
 </main>
</template>


<style scoped>
  .itemLayout {
    @apply flex flex-wrap  mr-4  mt-4 pb-5 justify-start;
    @apply border-gray-300 dark:border-gray-500;
  }

  .itemContent {
    @apply text-gray-400 font-light  font-mono font-500;
    @apply transition duration-500 ease-in-out  transform hover:-translate-y-1 hover:scale-110;
    @apply cursor-pointer  leading-4 display-inline-block ;
    padding: 7px;
    padding-left: 12px;
    font-size: 15px;
  }

  .itemCount {
    @apply relative text-base -top-2 -left-1;
    @apply text-gray-300;
  }
  .isActive {
    @apply text-dark;
    background-color: #f3f3f8;
    border-radius: 6px;
  }

  .dark .isActive {
    background-color: #2e2e2e;
    border-radius: 6px;
  }

  .btnPrevNext {
    @apply bg-dark border-gray-300 text-white rounded-xl py-2 px-3 relative inline-flex text-base font-medium
  }

</style>