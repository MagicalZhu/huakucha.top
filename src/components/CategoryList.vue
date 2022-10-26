<script setup lang="ts">
  import { getPageCount,getPage } from '~/utils/page'
  import { archiveConfig } from 'archiveConfig'

  const {getFunc} = useConfigStore()
  // 获取 Category 元数据
  const categoryMetaInfo: archiveConfig  = getFunc('categories')

  // 选中的标签
  let selectCategory = $ref('')

  // 获取所有的 tag,并且默认选中第一个
  const categoryData:any = computed(() => {
    const keys = Object.keys(categoryMetaInfo)
    selectCategory = keys[0]
    return keys
  })

    // 获取页数
  const pageCount = computed<number>(() => {
    return getPageCount(categoryMetaInfo[selectCategory], 'category')
  })

   const pageNum = $ref(1)

    const prev = computed(() => {
    return pageNum > 1
  })

  const next = computed(() => {
    return pageNum < pageCount.value
  })


  // 切换选中的标签
  const toggleCategory = (category:string) => {
    selectCategory = category
  }


  const contentData = computed(() => {
    return getPage(categoryMetaInfo[selectCategory], pageNum, 'category')
  })

</script>

<template>
  <div class="flex flex-wrap  space-x-6 mt-4 pb-6 justify-start tags">
    <span class="text-gray-400 font-light  hover:text-c-dark
                transition duration-500 ease-in-out  transform hover:-translate-y-1 hover:scale-110
                cursor-pointer text-base leading-4 display-inline-block font-mono
                "
          v-for="categoryName in categoryData"
          :class="{ activetag: selectCategory === categoryName }"
          @click="toggleCategory(categoryName)">
      {{categoryName}}
      <span class="tagsCount text-indigo-600">
        {{categoryMetaInfo[categoryName].length}}
      </span>
    </span>
  </div>
  <h4 class="hstack space-x-2 text-c-light hover:text-c-dark text-base font-mono" v-show="selectCategory">
    <div i-carbon:folder >
    </div>
    <span>{{ selectCategory }}</span>
  </h4>
  <div
      v-for="(item, index) in contentData"
      :key="index"
      class="my-1 mx-0.5 flex"
    >
    <router-link class="flex-1 !text-c font-mono" :to="item.path" style="text-decoration: none;">
      {{ item.frontmatter.title }}
    </router-link>
    <div class="leading-6 opacity-50 text-sm mr-2 mb-4">
      {{ item.date }}
    </div>
  </div>
  <!-- page -->
  <div class='mt-60 ml-10 mr-10'>
    <div class='prose prose-lg m-auto'>
      <button class="bg-dark border-gray-300 text-white rounded-xl py-2 px-3
                    relative inline-flex text-base font-medium"
              v-if="prev"
              @click="--pageNum">
        <div>
          <span i-carbon:chevron-left class="text-sm"></span>
          <span class="ml-1 pr-2">{{$t('theme.page.prev')}}</span>
        </div>
      </button>

      <button class="bg-dark border-gray-300 text-white rounded-xl py-2 px-3
                    relative inline-flex text-base font-medium float-right"
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

