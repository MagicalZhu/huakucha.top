<script setup lang="ts">

const authorName = useConfigStore().getThemeConfig().authorName

</script>
<template>
  <main class="not-prose">
    <section flex items-center gap-1 decoration-none border-none cursor-pointer hover:opacity-30 w-32>
      <div i-carbon:fingerprint-recognition inline-block text-red-200 text-2em mr-15px/>
      <p class="font-extrabold font-mono text-xl">Athu</p>
    </section>

    <section>
      <p class="font-mono pt-6">
        Hey! I'm {{authorName}}, a FE & BE developer.Currently working at a Japanese company.
      </p>
    </section>
    <!--block-->
    <div grid grid-cols-3 gap-1>
      <!--Posts-->
      <section animate-delay-300 mt-15px>
        <a href="/posts"
          class="flex items-center gap-1 decoration-none border-none cursor-pointer hover:opacity-30 w-32"
        >
        <p id="blockTitle">Posts</p><div text-sm class="i-ph-arrow-up-right"></div>
        </a>
      </section>

      <!--projects-->
      <section animate-delay-300 mt-15px>
        <a href="/posts"
          class="flex items-center gap-1 decoration-none border-none cursor-pointer hover:opacity-30 w-32"
        >
        <p id="blockTitle">Projects</p><div text-sm class="i-ph-arrow-up-right"></div>
        </a>
      </section>

      <!--projects-->
      <section animate-delay-300 mt-15px>
        <span
          class="flex items-center gap-1 decoration-none border-none hover:opacity-30 w-32"
        >
        <p id="blockTitle">Building</p>
        </span>
      </section>

    </div>
    <!-- detail -->
    <div grid grid-cols-3 gap-1>
      <!--building-->
      <section animate-delay-300 mt-15px>
      </section>
    </div>
    <!--About-->
    <section animate-delay-600 mt-15px>
      <p id="blockTitle">Now</p>
      <p class="font-mono">
        The programming languages I currently use regularly are Javascript and java.And i have recently been learning more about the Spring Framework and computer networking.
      </p>
      <p class="font-mono" mt-2em>
        Outside of programming, I also watch movies, especially science fiction and action movies, such as the Marvel series and the DC series.      </p>
    </section>
    <hr mt-15px/>
    <section animate-delay-600 mt-15px>
      <p id="blockTitle">Connect</p>
      <div grid grid-cols-8 gap-2>
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
    @apply md:text-base font-extrabold italic mb-8px;
  }
  #blockTitle::before {
    content: ":: ";
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
    margin: 2em auto !important;
  }

  .connectItem {
    @apply flex items-center gap-1 cursor-pointer hover:opacity-30 w-32 text-base;
  }
  
</style>