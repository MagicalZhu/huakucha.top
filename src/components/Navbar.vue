<template>
  <header
    ref="navbar"
    class="z-40 w-full h-17 flex justify-between items-center font-ui"
    p="x-4 md:x-5"
    :class="[
      isFixed &&
        'fixed -top-17 left-0 transition duration-300 ',
      isVisible && 'translate-y-full',
      !isFixed && !isVisible && 'absolute top-0 left-0'
    ]"
  >
    <router-link class="font-bold" un-text="c-light hover:c-dark" to="/">
      <span class="font-500">{{navConfig.shell}}</span>
      <div i-fa6-solid:angle-right
          class="inline-block"
          text="xs"/>
      <span class="blink">_</span>
    </router-link>

    <nav class="flex space-x-4">
      <router-link to="/talk" :title="$t('theme.nav.Talk')" class="nav-item">
        <div i-carbon:user-profile class="md:hidden" />
        <span class="lt-md:hidden">{{$t('theme.nav.Talk')}}</span>
      </router-link>

      <!-- <router-link to="/projects" title="Projects" class="nav-item">
        <div i-ph:rocket-launch-duotone class="md:hidden" />
        <span class="lt-md:hidden">Projects</span>
      </router-link> -->

      <router-link to="/posts" :title="$t('theme.nav.Blog')" class="nav-item">
        <div i-majesticons:paper-fold-text-line class="md:hidden" />
        <span class="lt-md:hidden">{{$t('theme.nav.Blog')}}</span>
      </router-link>

      <router-link to="/categories" :title="$t('theme.nav.Category')" class="nav-item">
        <div i-carbon:folder class="md:hidden" />
        <span class="lt-md:hidden">{{$t('theme.nav.Category')}}</span>
      </router-link>

      <router-link to="/tags" :title="$t('theme.nav.Tag')" class="nav-item">
        <div i-carbon:tag-group class="md:hidden" />
        <span class="lt-md:hidden">{{$t('theme.nav.Tag')}}</span>
      </router-link>

      <!-- <button nav-item title="Toggle Language" @click="toggleLanguage()">
        <div i-ion:language-outline />
      </button> -->

      <button nav-item title="Toggle dark" @click="toggleDark()">
        <div i="carbon-sun dark:carbon-moon" />
      </button>

      <slot />
    </nav>
  </header>
</template>

<script setup lang="ts">
import { isClient } from "@renovamen/utils";
import { toggleDark } from "~/composables/dark";

// const { availableLocales, locale } = useI18n()

// const toggleLanguage = () => {
//   const locales = availableLocales
//   locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
// }

const navConfig = useConfigStore().getThemeConfig().nav

const navbar = ref<HTMLElement | null>(null);
const isFixed = ref(true);
const isVisible = ref(true);

if (isClient) {
  const { y, directions } = useScroll(document);
  watch(y, () => {
    if (directions.top) {
      if (y.value > 0 && isFixed.value) isVisible.value = true;
      else {
        isVisible.value = true;
        isFixed.value = true;
      }
    } else if (directions.bottom) {
      isVisible.value = true;
      if (navbar.value && y.value > navbar.value!.offsetHeight)
        isFixed.value = true;
    }
  });
}
</script>
