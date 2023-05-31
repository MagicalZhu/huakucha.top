<script setup lang="ts">
  import  {Bloggers}  from '~/assets/data/bloggerData'
  const BloggerData = Bloggers
</script>
<template>
   <main class="not-prose">
    <div class="flex flex-col">
      <div class="-m-1.5 overflow-x-auto">
        <div class="p-1.5 min-w-full inline-block align-middle">
          <div class="border rounded-lg divide-y divide-gray-200">
            <div class="py-3 px-4">
              <div class="relative max-w-xs">
                <input type="text" 
                      p-2 pl-3 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500
                      placeholder="Search for items">
              </div>
            </div>
            <div class="overflow-hidden">
              <table class="min-w-full divide-y divide-gray-200">
                <tbody class="divide-y divide-gray-200">
                  <tr v-for="item in BloggerData">
                    <td class="pl-4 pr-1 py-2 whitespace-nowrap text-sm font-medium text-gray-800">
                      <div class="relative inline-block">
                        <img class="inline-block h-9 w-9 rounded-full ring-2 ring-white" 
                            :src="item.avatar" alt="Image Description">
                        <span class="absolute bottom-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-gray-300"></span>
                      </div>
                      <span pl-4>{{ item.name }}</span>
                    </td>
                    <td class="pl-4 pr-1 py-2 whitespace-nowrap text-sm font-medium text-gray-800">
                      <Badge text="Js" type="yellow"/>
                      <Badge text="Vue" type="green"/>
                    </td>
                    <td class="pl-4 pr-1 pt-4 whitespace-nowrap text-base font-medium text-gray-800 flex float-right">
                      <a v-if="item.website" :href="item.website" target="_blank" pr-4>
                        <div class="i-carbon:dns-services"></div>
                      </a>
                      <a v-if="item.github" :href="item.github" target="_blank" pr-4>
                        <div class="i-carbon:logo-github"></div>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
