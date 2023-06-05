<script setup lang="ts">
  import  { Bloggers }  from '~/assets/data/bloggerData'
  import  { Blogger } from 'share'
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
        if(item.name.toLowerCase().indexOf(props.searchKey.toLowerCase()) > -1) {
          return true
        }
        return false
      })
    }
  }, 300)
</script>
<template>
  <div class="overflow-hidden mx-auto w-4/5">
    <template v-if="BloggerData.length!==0">
      <table class="min-w-full divide-y divide-gray-200">
        <tbody>
          <tr v-for="item in BloggerData">
            <td class="pl-2 pr-1 py-2 whitespace-nowrap text-sm font-medium text-gray-800">
              <div class="relative inline-block">
                <img class="inline-block h-9 w-9 rounded-full ring-2 ring-white bg-gray-100"
                    :src="item.avatar" alt="Image Description">
                <!-- <span class="absolute bottom-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-green-300"></span> -->
              </div>
              <span pl-4>{{ item.name }}</span>
            </td>
            <!-- <td class="pl-4 pr-1 py-2 whitespace-nowrap text-sm font-medium text-gray-800">
              <Badge text="Js" type="yellow"/>
              <Badge text="Vue" type="green"/>
            </td> -->
            <td class="pl-4 pr-1 pt-4 whitespace-nowrap text-base font-medium text-gray-800 flex float-right">
              <a v-for="(url, name) in item.social" :href="url" target="_blank" pr-4 :title="name">
                    <div :class="socicalMap[name]"></div>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <template v-else>
      <table class="min-w-full divide-y divide-gray-200">
        <tbody>
          <tr>
            <td class="pl-4 pr-1 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-center">
              No Data....
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<style scoped>
  .not-prose {
    @apply mx-auto text-dark font-mono text-base;
    max-width: 70ch;
  }

</style>

<route lang="yaml">
  meta:
    layout: fav
</route>
