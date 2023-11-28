<template>
  <div>
    <header
      ref="navbar"
      :class="
        cn(
          'z-40 w-full  text-base px-4 md:px-5',
          isFixed && 'fixed -top-17 left-0 transition duration-300 ',
          isVisible && 'translate-y-full',
          !isFixed && !isVisible && 'absolute top-0 left-0'
        )
      "
    >

      <nav class="space-x-2 float-right flex">

        <!--
        <router-link to="/talk" :title="$t('theme.nav.Talk')" class="nav-item">
          <div i-uil:message></div>
        </router-link>
        -->
        <router-link to="/" :title="$t('theme.nav.Me')" class="nav-item">
          <icon-carbon:account/>
        </router-link>

        <router-link to="/posts" :title="$t('theme.nav.Blog')" class="nav-item">
          <icon-carbon:blog/>
        </router-link>

        <router-link to="/categories" :title="$t('theme.nav.Category')" class="nav-item">
          <icon-carbon:folders class="saturate-0"/>
        </router-link>

        <router-link to="/tags" :title="$t('theme.nav.Tag')" class="nav-item">
          <icon-carbon:tag-group/>
        </router-link>

        <router-link to="/projects" :title="$t('theme.nav.Projects')" class="nav-item">
          <icon-carbon:terminal/>
        </router-link>
        <a href="https://www.travellings.cn/go.html" :title="$t('theme.nav.Travelling')" class="nav-item">
          <icon-carbon:bus/>
        </a>
        <router-link to="/rss" :title="$t('theme.nav.Rss')" class="nav-item">
          <icon-carbon:rss/>
        </router-link>
        <router-link to="/share" :title="$t('theme.nav.Favorite')" class="nav-item">
          <icon-carbon:favorite/>
        </router-link>

        <button :title="$t('theme.nav.Favorite')" class="nav-item" @click="isOpen = true">
          <icon-carbon:mac-command/>
        </button>

        <!--
        <button nav-item :title="toggleTip" @click="toggleDark()" >
          <div class="dark:i-cil:moon i-cil:sun" ></div>
        </button>

        -->
        <slot ></slot>
      </nav>
    </header>
    <Dialog v-model:open="isOpen">
      <DialogContent>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandList class="font-display"
                    @escape-key-down="isOpen = false">
            <CommandGroup heading="Suggestions">
              <CommandItem value="calendar">
                Calendar
              </CommandItem>
              <CommandItem value="search-emoji">
                Search Emoji
              </CommandItem>
              <CommandItem value="calculator">
                Calculator
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem value="profile">
                Profile
              </CommandItem>
              <CommandItem value="billing">
                Billing
              </CommandItem>
              <CommandItem value="settings">
                Settings
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { isClient } from "@renovamen/utils";
import { cn } from '@/lib/utils'
// import { toggleDark } from "~/composables/dark";

const isOpen = ref(false)

const navbar = ref<HTMLElement | null>(null);
const isFixed = ref(true);
const isVisible = ref(true);

// const toggleTip = computed(() => !isDark.value ? 'Toggle Dark' : 'Toggle Light')

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
