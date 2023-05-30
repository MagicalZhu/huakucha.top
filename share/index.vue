<script setup lang="ts">
  export interface shareCategories {
    name: string,
    url: string,
    desc: string,
    icon: string
  }
  const data:shareCategories[] = [
    {
      name: 'Bloggers',
      url: '/share/bloggers',
      desc: 'Here are some bloggers I follow.',
      icon: 'i-carbon:user-multiple'
    },
    {
      name: 'Articles',
      url: '/share/articles',
      desc: "I'll bookmark my favourite article blogs here.",
      icon: 'i-carbon:document-sentiment'
    },
    {
      name: 'Websites',
      url: '/share/websites',
      desc: "Here are some interesting web sites.",
      icon: 'i-carbon:dns-services'
    }
  ]
</script>
<template>
  <main class="not-prose">
    <ul role="list"  divide-gray-100 pt-2em>
      <li v-for="item in data" class="liItem">
        <div class="flex gap-x-4">
          <div class="shareDetailIcon" :class="item.icon"></div>
          <div class="min-w-0 flex-auto">
            <router-link :to="item.url"
                        decoration-black underline underline-offset-8	decoration-1
                        decoration-zinc-300 hover:decoration-black
                        >
              {{ item.name }}
            </router-link>
            <p class="mt-1 ml-1 truncate text-xs leading-5 text-gray-500">{{ item.desc }}</p>
          </div>
        </div>
        <!-- <p class="mt-4 text-xs leading-5 text-gray-500">Last update <time datetime="2023-01-23T13:23Z">3h ago</time></p> -->
      </li>
    </ul>
  </main>
</template>


<style scoped>
  .shareDetailIcon {
    @apply bg-gray-8 h-13 w-8 flex-none rounded-full;
  }
  .liItem {
    @apply flex justify-between gap-x-6 py-5;
  }
  .not-prose {
    @apply mx-auto text-dark font-mono text-base;
    max-width: 70ch;
  }
</style>

<route lang="yaml">
  meta:
    layout: about
</route>
