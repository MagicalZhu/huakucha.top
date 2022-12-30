<template>
  <header
    ref="navbar"
    class="z-40 w-full h-17 flex justify-between items-center text-base"
    p="x-4 md:x-5"
    :class="[
      isFixed &&
        'fixed -top-17 left-0 transition duration-300 ',
      isVisible && 'translate-y-full',
      !isFixed && !isVisible && 'absolute top-0 left-0'
    ]"
  >
    <router-link class="font-bold" un-text="c-light hover:c-dark" to="/">
      <span class="font-500 text-lg">{{authorName}}</span>
      <span class="blink">_</span>
    </router-link>

    <nav class="flex space-x-4">
      <router-link to="/talk" :title="$t('theme.nav.Talk')" class="nav-item">
        <div i-uil:message></div>
      </router-link>

      <!-- <router-link to="/projects" title="Projects" class="nav-item">
        <div i-ph:rocket-launch-duotone />
      </router-link> -->

      <router-link to="/posts" :title="$t('theme.nav.Blog')" class="nav-item">
        <div i-carbon:blog></div>
      </router-link>

      <router-link to="/categories" :title="$t('theme.nav.Category')" class="nav-item">
        <div i-carbon:folder></div>
      </router-link>

      <router-link to="/tags" :title="$t('theme.nav.Tag')" class="nav-item">
        <div i-carbon:tag-group ></div>
      </router-link>

      <!-- <button nav-item title="Toggle Language" @click="toggleLanguage()">
        <div i-ion:language-outline />
      </button> -->

      <button nav-item :title="toggleTip" @click="toggleDark()" >
        <div class="dark:i-akar-icons:moon-fill i-carbon:light-filled" ></div>
      </button>

      <slot ></slot>
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

const authorName = useConfigStore().getThemeConfig().authorName

const navbar = ref<HTMLElement | null>(null);
const isFixed = ref(true);
const isVisible = ref(true);

const toggleTip = computed(() => !isDark.value ? 'Toggle Dark' : 'Toggle Light')

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
