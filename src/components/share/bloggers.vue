<script setup lang="ts">
  import  { Bloggers }  from '~/assets/data/bloggerData'
  import  { Blogger } from 'share'
  import { getColor } from '~/utils/badgeUtil'
  import { queryInStringArray } from '~/utils/index'
  import filter from 'lodash/filter'
  import debounce from 'lodash/debounce'
  const BloggerData = ref(Bloggers || [])

  const props = defineProps<{
    searchKey: string
  }>()

  watch(
    () => props.searchKey,
    (newVal, oldVal) => {
      query()
  })

  const socicalMap:{[key:string]:string} = {
    Personal: 'i-carbon:dns-services',
    Github: 'i-carbon:logo-github',
    Juejin:'i-carbon:dns-services',
    InfoQ:'i-carbon:dns-services',
    Cnblogs:'i-carbon:dns-services',
    CSDN:'i-carbon:dns-services',
  }

  const query = debounce(() => {
    if (props.searchKey.trim() === '' || Bloggers.length === 0) {
      BloggerData.value = Bloggers
    } else {
      BloggerData.value = filter(Bloggers, (item: Blogger) => {
        if(item.name.toLowerCase().indexOf(props.searchKey.toLowerCase()) > -1 ||
          queryInStringArray(item.blogTypes, props.searchKey).length > 0 ||
          queryInStringArray(item.techLangs ?? [], props.searchKey).length > 0) {
          return true
        }
        return false
      })
    }
  }, 300)

</script>
<template>
  <div class="overflow-hidden mx-auto w-4/5">
    <template v-if="BloggerData.length !==0">
      <div class="maxHeight overflow-y-auto">
        <ul class="divide-y divide-gray-100">
          <li class="flex justify-between gap-x-6 py-5"  v-for="item in BloggerData">
            <div class="flex gap-x-4">
              <img class="h-12 w-12 flex-none rounded-full bg-gray-50" 
                    :src="item.avatar"
                    alt="">
              <div class="min-w-0 flex-auto">
                <p class="text-sm font-semibold leading-6 text-gray-900">{{ item.name }}</p>
                <div class="mt-1 truncate text-base leading-5 text-gray-500 flex">
                  <a v-for="(url, name) in item.social" :href="url" pr-3 target="_blank"  :title="name">
                    <div :class="socicalMap[name]"></div>
                  </a>
                </div>
              </div>
            </div>
            <div class="flex items-center" >
              <Badge :text="tagItem" :type="getColor(tagItem)" v-for="tagItem in item.blogTypes.concat(item.techLangs ?? [])"/>
            </div>
          </li>
        </ul>
      </div>
    </template>
    <template v-else>
      <div class="pl-4 pr-1 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-center">
        No Data....
      </div>
    </template>
  </div>
</template>

<style scoped>

  .maxHeight {
    max-height: 60vh;
  }
  .not-prose {
    @apply mx-auto text-dark font-mono text-base;
    max-width: 70ch;
  }

</style>

<route lang="yaml">
  meta:
    layout: fav
</route>
