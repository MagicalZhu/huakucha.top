
<template>
  <main class="flex flex-col min-h-full text-c">
    <div class="mb-6">
      <Navbar>
        <slot name="navbar"></slot>
      </Navbar>
      <div class="prose mx-auto">
        <div class="flex flex-col items-center min-h-[calc(10vh-44px)] justify-center">
          <div i-carbon:fingerprint-recognition inline-block text-red-200 dark:text-indigo-300 text-5em/>
          <h1 class="noBorder">
            <span>Athu</span>
            <span text-base opacity-60 ml-3 font-mono>Do More</span>
          </h1>
        </div>

        <p class="text-base font-600">
          Front-end & Back-end developer.
        </p>
        <p class="text-base font-600">
          Currently working at a Japanese company.
        </p>
        <p class="text-base font-600">
          You can find me on
          <a
              class="transition-colors  social"
              href="https://github.com/MagicalZhu"
              target="_blank"
            >Github</a>,
            <a
              class="transition-colors  social"
              href="https://okjk.co/V3s0CF"
              target="_blank"
            >Jike</a>,
            <a
              class="transition-colors social"
              href="mailto:huakucha95@163.com"
              target="_blank"
            >Mail</a> is also possible.
        </p>

        <h1 class="noBorder">
          Interests
        </h1>

        <ul>
          <li>Web Development</li>
          <li> Watching Movies(Especially science fiction, suspense and action)</li>
          <li><s>Games</s></li>
          <li><s>Sleeping and Eating</s></li>
        </ul>

        <h1 class="noBorder">
          Miscellaneous
        </h1>

        <ul>
          <li>
            🚀 This personal website is built on <app-link to="https://github.com/antfu/vitesse">Vitesse</app-link>,
            thanks to <app-link to="https://antfu.me/">@antfu</app-link>
            for the template&nbsp; <span font-700>(｀･ω･´)ゞ</span>
          </li>
          <li>
            🌈 Imagine having a Tinker Bell pocket &nbsp; <span font-700>(✧◡✧)</span>
          </li>
          <li>
            🌭 My dream: <em font-mono text-brand>while(sleeping){money++;}</em>&nbsp; <span font-700>( • ̀ω•́ )✧</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- <Links :links="socials" class="justify-center"/> -->
    <WelcomeMsg/>
  </main>
</template>

<style scoped>
  .noBorder {
    border-bottom-style:none;
    padding-bottom: unset;
    margin-top: 15px;
  }
  .social {
    @apply text-black dark:text-current;
  }
</style>
