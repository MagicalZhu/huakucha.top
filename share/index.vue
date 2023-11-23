<script setup lang="ts">
  import articles from '~/components/share/articles.vue'
  /*
  import blogger from '~/components/share/blogger.vue'
  import websites from '~/components/share/websites.vue'
  */

  const currentTab = ref('articles')
  const searchKey = ref('')

  const tabs = {
    articles,
  }
  const changeTab = (selectTab:string) => {
    searchKey.value = ''
    currentTab.value = selectTab
  }
  useCustomTitle('Share')
  const clear = () => {
    searchKey.value = ''
  }
</script>
<template>
  <main class="not-prose">
    <nav class="-mb-0.5 flex justify-center space-x-5">
      <button
          v-for="(_, tab) in tabs"
          :key="tab"
          :class="['tab', { active: currentTab === tab }]"
          @click="changeTab(tab)"
        >
          {{ $t(`theme.fav.${tab}`) }}
      </button>
    </nav>
    <div>
      <div class="relative mx-auto w-4/5 mb-8 mt-2">
        <input type="text"
              v-model="searchKey"
              class="py-2 px-4 pl-11 block w-full w-full rounded-md text-sm  outline outline-2 outline-gray-200 focus:outline-blue-200"
              :placeholder="`Search  ${currentTab}...`">
        <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4">
          <span i-carbon-search text-gray-400></span>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pointer-events-none z-20 pr-4">
          <button  @click="clear"
                  :class="searchKey !== '' ? 'i-carbon:close-outline text-gray-400 cursor-pointer pointer-events-auto' : ''">
          </button>
        </div>
      </div>
    </div>
    <KeepAlive>
      <component :is="tabs[currentTab]" :searchKey="searchKey"></component>
    </KeepAlive>
  </main>
</template>

<route lang="yaml">
  meta:
    layout: fav
</route>
