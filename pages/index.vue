<script setup lang="ts">
  import {getBlogs} from '~/utils/index'

  const authorName = useConfigStore().getThemeConfig().authorName
  const blogMetaInfo = computed(() => getBlogs())
  const latestPost = blogMetaInfo.value.splice(0,3)

</script>
<template>
  <main class="not-prose">
    <section flex items-center gap-1 decoration-none border-none>
      <!-- <div i-carbon:fingerprint-recognition inline-block text-red-200 text-2em mr-10px/> -->
      <div font-mono font-italic text-2xl>
        Athu
        <span text-sm align-text-bottom text-gray-4>do More</span>
      </div>
    </section>

    <section>
      <p class="font-mono pt-5">
        Hey! I'm {{authorName}}, a FE & BE developer.Currently working at a Japanese company.
      </p>
    </section>
    <!--block-->
    <div grid grid-cols-2 gap-1 pt-2em>
      <!--Posts-->
      <section class="blockSection">
        <a href="/posts"
          class="flex items-center gap-1 decoration-none border-none cursor-pointer hover:opacity-30 w-32"
        >
        <span id="blockTitle" font-serif>Posts</span><div text-base class="i-ph-arrow-up-right"></div>
        </a>
      </section>

      <!--projects-->
      <section class="blockSection">
        <a href="/posts"
          class="flex items-center gap-1 decoration-none border-none cursor-pointer hover:opacity-30 w-32"
        >
        <p id="blockTitle" font-serif>Projects</p><div text-base class="i-ph-arrow-up-right"></div>
        </a>
      </section>
    </div>
    <!-- detail -->
    <div grid grid-cols-2 gap-1 mt-1.5em>
      <!--Posts-->
      <section animate-delay-300 mt-8px>
        <div v-for="(article, index) in latestPost" mt-2 ml-2>
          {{ `${index}.` }}
          <router-link :to="article.path"
                        decoration-black underline underline-offset-8	decoration-1
                        decoration-zinc-300 hover:decoration-black>
            <span  mt-2>{{ article.title }}</span>
          </router-link>
        </div>
      </section>

      <!-- projects -->
      <section animate-delay-300 mt-8px>
        Working...
      </section>
    </div>

    <!--About-->
    <section animate-delay-600 pt-2em>
      <p id="blockTitle" font-serif>Now</p>
      <p class="font-mono">
        The programming languages I currently use regularly are Javascript and java.And i have recently been learning more about the Spring Framework and computer networking.
      </p>
      <p class="font-mono" pt-2em>
        Outside of programming, I also watch movies, especially science fiction and action movies, such as the Marvel series and the DC series.      </p>
    </section>
    <hr mt-15px/>
    <section animate-delay-600>
      <span id="blockTitle" font-serif>Contact</span>
      <div grid grid-cols-3 gap-1>
        <div>
          <a class="connectItem"
            target="_blank"
            href="mailto:huakucha95@163.com"
          >
            <div class="i-carbon:email-new"></div>
            <p>Email</p>
          </a>
        </div>
        <div>
          <a class="connectItem"
            target="_blank"
            href="https://github.com/MagicalZhu"
          >
            <div  class="i-carbon:logo-github"></div>
            <p>Github</p>
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

<style>
  #blockTitle {
    @apply md:text-base font-extrabold italic;
  }
  #blockTitle::before {
    content: ":: ";
  }

  .blockSection {
    @apply animate-delay-300 mt-15px font-serif font-medium;
  }

  .normalStyle {
    @apply opacity8  animate-fill-both font-sans font-medium mt-8;
  }

  .not-prose {
    color: var(--un-prose-body);
    max-width: 80ch;
    @apply mx-auto text-dark;
  }

  hr {
    width: 50px;
    margin-top: 2em !important;
    margin-bottom: 1em !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }

  .connectItem {
    @apply flex items-center gap-1 cursor-pointer hover:opacity-30 w-32 text-base;
  }
</style>
