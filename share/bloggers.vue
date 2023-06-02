<script setup lang="ts">
  import  {Bloggers}  from '~/assets/data/bloggerData'
  import  { Blogger } from 'share'
  import filter from 'lodash/filter'
  import debounce from 'lodash/debounce'
  const BloggerData = ref(Bloggers || [])
  const searchKey = ref('')

  watch(searchKey, (newVal, oldVal) => {
    query()
  })

  const query = debounce(() => {
    if (searchKey.value.trim() === '' || Bloggers.length === 0) {
      BloggerData.value = Bloggers
    } else {
      BloggerData.value = filter(Bloggers, (item: Blogger) => {
        if(item.name.toLowerCase().indexOf(searchKey.value.toLowerCase()) > -1) {
          return true
        }
        return false
      })
    }
  }, 300)

  useCustomTitle('ShareBlogger')

</script>
<template>
  <main class="not-prose">
    <div class="mx-auto w-3/5 mb-8">
      <input type="text"
            v-model="searchKey"
            class="queryBox"
            p-2 pl-3 w-full rounded-md text-sm  outline outline-2 outline-gray-200 focus:outline-blue-200
            placeholder="Search blogger...">
    </div>
    <div class="-m-1.5 overflow-x-auto">
      <div class="overflow-hidden">
        <template v-if="BloggerData.length!==0">
          <table class="min-w-full divide-y divide-gray-200">
            <tbody>
              <tr v-for="item in BloggerData" hover:bg-gray-100>
                <td class="pl-4 pr-1 py-2 whitespace-nowrap text-sm font-medium text-gray-800">
                  <div class="relative inline-block">
                    <img class="inline-block h-9 w-9 rounded-full ring-2 ring-white bg-gray-100"
                        :src="item.avatar" alt="Image Description">
                    <span class="absolute bottom-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-gray-300"></span>
                  </div>
                  <span pl-4>{{ item.name }}</span>
                </td>
                <!-- <td class="pl-4 pr-1 py-2 whitespace-nowrap text-sm font-medium text-gray-800">
                  <Badge text="Js" type="yellow"/>
                  <Badge text="Vue" type="green"/>
                </td> -->
                <td class="pl-4 pr-1 pt-4 whitespace-nowrap text-base font-medium text-gray-800 flex float-right">
                  <a v-if="item.website" :href="item.website" target="_blank" pr-4 title="个人站">
                    <div class="i-carbon:dns-services"></div>
                  </a>
                  <a v-if="item.github" :href="item.github" target="_blank" pr-4 title="Github">
                    <div class="i-carbon:logo-github"></div>
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
    </div>
  </main>
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
