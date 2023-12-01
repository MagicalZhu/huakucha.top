<script setup lang="ts">
  import {getBlogs} from '~/utils/index'

  const authorName = useConfigStore().getThemeConfig().authorName
  const blogMetaInfo = computed(() => getBlogs())
  const latestPost = blogMetaInfo.value.splice(0,3)

</script>
<template>
  <main class="not-prose">
    <section class="flex items-center gap-1 decoration-none border-none">
      <!-- <div i-carbon:fingerprint-recognition inline-block text-red-200 text-2em mr-10px/> -->
      <div class="font-mono text-2xl">
        <span class="font-extrabold">Ant</span>
        <!-- <span class="text-sm align-text-bottom text-muted-foreground ml-2">do more</span> -->
      </div>
    </section>

    <section>
      <p class="font-mono pt-5">
        Hey! I'm {{authorName}}, a FE & BE developer.Currently working at a Japanese company.
      </p>
    </section>

    <!-- Post and project intro -->
    <div class="grid grid-cols-2 gap-1 pt-[2em]">
      <!--Posts-->
      <section class="indexSection">
        <a href="/posts"
          class="flex items-center gap-1 decoration-none border-none cursor-pointer hover:opacity-30 w-32"
        >
        <span class="indexBlock">Posts</span>
        <span class="i-ph-arrow-up-right"/>
        </a>
      </section>

      <!--projects-->
      <section class="indexSection">
        <a href="/projects"
          class="flex items-center gap-1 decoration-none border-none cursor-pointer hover:opacity-30 w-32"
        >
        <p class="indexBlock">Projects</p>
        <span class="i-ph-arrow-up-right"/>
        </a>
      </section>
    </div>
    <div class="grid grid-cols-2 gap-1">
      <!--Posts-->
      <section class="animate-delay-300 mt-[8px]">
        <div v-for="(article, index) in latestPost" class="mt-2 ml-2">
          {{ `${index}.` }}
          <router-link :to="article.path"
                    class="underline underline-offset-8	decoration-1 decoration-zinc-300 hover:decoration-black">
            <span class="mt-2">{{ article.title }}</span>
          </router-link>
        </div>
      </section>

      <!-- projects -->
      <section class="animate-delay-300 mt-[8px]">
        <div class="mt-2 ml-2">
          <span>0.</span>
          <router-link to="https://github.com/MagicalZhu/NoteLib"
                    class="underline underline-offset-8	decoration-1 decoration-zinc-300 hover:decoration-black">
            <span class="mt-2">Notes</span>
          </router-link>
        </div>
        <div class="mt-2 ml-2">
          <span>1.</span>
          <router-link to="https://github.com/MagicalZhu/vitesseDoc"
                      class=" underline underline-offset-8	decoration-1 decoration-zinc-300 hover:decoration-black">
            <span class="mt-2">Blog</span>
          </router-link>
        </div>
      </section>
    </div>

    <!-- Favorites intro -->
    <section class=" animate-delay-600 pt-[2em]">
      <p class="indexBlock">Fav</p>
      <p class="font-mono mt-[8px]">
        I will bookmark some great blogs and follow some great bloggers
        <router-link to="/share"
                  class="underline underline-offset-8	decoration-1 underline-solid decoration-zinc-300 hover:decoration-black">
          <em>here</em>
        </router-link>
      </p>
    </section>

    <!--Now-->
    <section class="animate-delay-600 pt-[2em]">
      <p class="indexBlock">Now</p>
      <p class="font-mono mt-[8px]">
        The programming languages I currently use regularly are Javascript and java.And i have recently been learning more about the Spring Framework and computer networking.
      </p>
      <p class="font-mono pt-[2em]">
        Outside of programming, I also watch movies, especially science fiction and action movies, such as the Marvel series and the DC series.      </p>
    </section>
    <hr class="indexHr mt-15px"/>
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
