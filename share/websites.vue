<script setup lang="ts">
  import  { Websites }  from '~/assets/data/websiteData'
  import  { Website } from 'share'
  import filter from 'lodash/filter'
  import debounce from 'lodash/debounce'
  const WebsiteData = ref(Websites || [])
  const searchKey = ref('')

  watch(searchKey, (newVal, oldVal) => {
    query()
  })

  const query = debounce(() => {
    if (searchKey.value.trim() === '' || Websites.length === 0) {
      WebsiteData.value = Websites
    } else {
      WebsiteData.value = filter(Websites, (item: Website) => {
        if(item.name.toLowerCase().indexOf(searchKey.value.toLowerCase()) > -1) {
          return true
        }
        return false
      })
    }
  }, 300)

  useCustomTitle('ShareWebsites')

</script>
<template>
  <main class="not-prose">
    <div class="mx-auto w-3/5 mb-8">
      <input type="text"
            v-model="searchKey"
            class="queryBox"
            p-2 pl-3 w-full rounded-md text-sm  outline outline-2 outline-gray-200 focus:outline-blue-200
            placeholder="Search website...">
    </div>
    <div class="-m-1.5 overflow-x-auto">
      <div class="overflow-hidden">
        <template v-if="WebsiteData.length!==0">
          <table class="min-w-full divide-y divide-gray-200">
            <tbody>
              <tr v-for="item in WebsiteData">
                <td class="pl-4 pr-1 py-2 whitespace-nowrap text-sm font-medium text-gray-800">
                  <span pl-4>2023-06-02</span>
                </td>
                <td class="pl-4 pr-1 py-2 whitespace-nowrap text-base font-medium text-gray-800">
                  <span pl-4>{{ item.title }}</span>
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
