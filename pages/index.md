---
socials:
  - icon: i-carbon:email
    link: "mailto:18151271579@163.com"
    classList: "!text-blue-600 dark:!text-blue-400"
  - icon: i-eva:github-outline
    link: https://github.com/MagicalZhu
    classList: "!text-gray-600"
  - icon: i-carbon:book
    link: https://www.huakucha.top
    classList: "!text-green-700 dark:!text-green-500"
  - icon: i-tabler:letter-j
    link: https://okjk.co/V3s0CF
    classList: "!text-yellow-600 dark:!text-yellow-400"
---

<div class="flex items-start text-base">
  <div class="mr-5 mt-10px shrink-0 rounded-full border-[0.5px] border-black/10 bg-white/50 p-1 shadow-xl dark:bg-white/80">
    <img class="my-0 h-32 w-32 rounded-full !bg-black/5  dark:!bg-black/80"
          src="/public/img/avatar.jpg"
          alt="atu"/>
  </div>
  <h1 class="noBorder ml-6">
    Atu
    <!-- <span text-sm opacity-50 ml-2>朱玉良</span> -->
    <br/>
    <span text-sm opacity-50 ml-2 font-normal>Do More</span>
  </h1>
</div>

<p class="opacity-70 text-base pt-5">
  Atu is a java developer as well as a node full stack developer.
  <br/>
  He currently works for a Japanese company and uses node as his main development language.
  <br/>
  You can find he on
    <a
      v-for="(item, i) in frontmatter.socials"
      :key="`social-${i}-${item.icon}`"
      class="px-2 mr-1 mb-1 rounded transition-colors decoration-none text-base !text-c"
      :class="item.classList"
      :href="item.link"
      target="_blank"
      style="border-bottom:none;"
    >
      <div :class="item.icon" class="w-5 h-5" />
      <!-- <div v-if="item.name">{{ item.name }}</div> -->
    </a>
</p>

<h1 class="noBorder">
  Interests
</h1>

- Web Development
- Watching Movies(Especially science fiction, suspense and action)
- ~~Games~~
- ~~Sleeping and Eating~~

<h1 class="noBorder">
  Miscellaneous
</h1>

- 🚀 This personal website is built on <app-link to="https://github.com/antfu/vitesse">Vitesse</app-link>,
thanks to <app-link to="https://antfu.me/">@antfu</app-link> for the template&nbsp; <span font-700>(｀･ω･´)ゞ</span>
- 🌈 Imagine having a Tinker Bell pocket &nbsp; <span font-700>(✧◡✧)</span>
- 🌭 My dream: <em font-mono text-brand>while(sleeping){money++;}</em>&nbsp; <span font-700>( • ̀ω•́ )✧</span>


<style scoped>
  .noBorder {
    border-bottom-style:none;
    padding-bottom: unset;
    margin-top: 1em;
  }
</style>

<route lang="yaml">
meta:
  layout: about
</route>

