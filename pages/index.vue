<script setup lang="ts">
  import {getBlogs} from '~/utils/index'
  import { formatDate } from "~/utils"
  import dayjs from 'dayjs'

  const authorName = useConfigStore().getThemeConfig().authorName
  const blogMetaInfo = computed(() => getBlogs())
  const latestPost = blogMetaInfo.value.splice(0,4)

  const years = dayjs().diff(dayjs('2017-9-1'), 'year')

</script>
<template>
  <main class="not-prose">
    <section class="flex items-center gap-1 decoration-none border-none">
      <div>
        <p class="text-2xl font-extrabold">
          Bonjour, Here's {{authorName}} Space
          <span class="i-fluent-emoji-hugging-face align-text-bottom"></span>
        </p>
      </div>
    </section>

    <section>
      <p class="font-mono pt-5 max-w-[75ch] text-sm">
        FE & BE developer with over {{ years }} years of web experience.
      </p>
      <p class="font-mono pt-2 max-w-[75ch] text-sm">
        Outside of work I learning Spring Framework、Database and CloudNative...
      </p>
    </section>


    <!-- Last Posts -->
    <div class="grid grid-cols-2 gap-1 pt-[2em]">
      <section class="indexSection">
        <span class="indexBlock">Last posts</span>
      </section>
      <section class="mt-[15px]">
        <a href="/posts"
          class="flex  gap-1 border-none cursor-pointer hover:opacity-30 w-32 duration-700 float-right
                underline underline-offset-4 decoration-dashed decoration-[0.08em] decoration-zinc-400 hover:decoration-solid"
        >
          <p class="text-sm">See all posts</p>
        </a>
      </section>
    </div>
    <section class="grid grid-cols-2 gap-1 md:flex-row md:flex-wrap pt-4">
      <div v-for="(article) in latestPost" class="mt-2">
        <router-link class="group flex cursor-pointer flex-col gap-2 rounded-md border
                          border-neutral-400 p-4 transition-all
                            duration-300 hover:-translate-y-2 hover:border-neutral-700"
                  :to="article.path" >
          <div class="flex w-full flex-col justify-between gap-2 md:flex-row md:items-center">
            <p class="basis-1/2">{{ article.title }}</p>
            <p class="opacity-40 text-xs">
              {{ formatDate(article.date, true) }}
            </p>
            <div class="md:i-carbon-arrow-up-right flex flex-row items-center gap-4 text-muted-foreground"/>

          </div>
          <p class="flex">
            <span class="tagName" v-for="tagName in article.tags">
              #{{tagName}}
            </span>
          </p>
        </router-link>
      </div>
    </section>

    <!--Now-->
    <section class="animate-delay-600 pt-[2em]">
      <p class="indexBlock">Now</p>
      <p class="font-mono mt-[8px]">
        The programming languages I currently use regularly are Javascript and java.And i have recently been learning more about the Spring Framework and computer networking.
      </p>
      <p class="font-mono pt-4">
        Outside of programming, I also watch movies, especially science fiction and action movies, such as the Marvel series and the DC series.      </p>
    </section>
    <hr class="indexHr mt-[15px]"/>
    <!-- Contact -->
    <section class="animate-delay-600">
      <span class="indexBlock">Contact</span>
      <div class="grid grid-cols-3 gap-1 mt-[8px]">
        <div>
          <a class="connectItem"
            target="_blank"
            href="mailto:huakucha95@163.com"
          >
            <span class="i-carbon-email-new"/>
            <p>Email</p>
          </a>
        </div>
        <div>
          <a class="connectItem"
            target="_blank"
            href="https://github.com/MagicalZhu"
          >
            <span class="i-carbon-logo-github"/>
            <p>Github</p>
          </a>
        </div>
        <div>
          <a class="connectItem"
            target="_blank"
            href="https://m.cmx.im/@athu"
          >
            <span class="i-mdi-mastodon"/>
            <p>Mastodon</p>
          </a>
        </div>
      </div>
    </section>

  </main>
</template>

<route lang="yaml">
  meta:
    layout: about
</route>
