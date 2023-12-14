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
          <span class="i-carbon-account"></span>
        </router-link>

        <router-link to="/posts" :title="$t('theme.nav.Blog')" class="nav-item">
          <span class="i-carbon-blog"></span>
        </router-link>

        <router-link to="/categories" :title="$t('theme.nav.Category')" class="nav-item">
          <span class="i-carbon-folders"></span>
        </router-link>

        <router-link to="/tags" :title="$t('theme.nav.Tag')" class="nav-item">
          <span class="i-carbon-tag-group"></span>
        </router-link>

        <a href="https://www.travellings.cn/go.html" :title="$t('theme.nav.Travelling')" class="nav-item">
          <span class="i-carbon-bus"></span>
        </a>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <span class="i-carbon-crossroads nav-item"></span>
          </DropdownMenuTrigger>
          <DropdownMenuContent  class="font-display">
            <DropdownMenuItem
              @select="() => {
                router.push('/rss')
              }">
              <span>RssDash</span>
            </DropdownMenuItem>

            <DropdownMenuItem @select="() => {
              router.push('/share')
            }">
              <span>Share</span>
            </DropdownMenuItem>
            <CommandSeparator />
            <DropdownMenuItem @select="()=> { isOpen = true }">
              <span>CMD</span>
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <!--
        <button nav-item :title="toggleTip" @click="toggleDark()" >
          <div class="dark:i-cil:moon i-cil:sun" ></div>
        </button>

        -->
        <slot ></slot>
      </nav>
    </header>

    <Dialog v-model:open="isOpen">
      <DialogContent class="font-display rounded-lg border shadow-md">
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandList @escape-key-down="isOpen = false">
            <CommandGroup heading="Suggestions">
            <router-link  v-for="(item, index) in Suggestions"
                          :to="item.href">
              <CommandItem
                :key="index"
                :value="item.name"
                @select="(ev) => {
                    isOpen = false
                  }"
               >
                <span :class="item.class"/>
                <span>{{item.name}}</span>
              </CommandItem>
            </router-link>
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
import { menuConfig } from 'menuConfig'
// import { toggleDark } from "~/composables/dark";

const isOpen = ref(false)

const navbar = ref<HTMLElement | null>(null);
const isFixed = ref(true);
const isVisible = ref(true);
const keys = useMagicKeys()
const CmdK = keys['Cmd+k', 'option+k']
const router = useRouter()

watch(CmdK, (v) => {
  if (v) {
    isOpen.value = true
  }
})


const Suggestions: Array<menuConfig> = [
  {
    name: 'About',
    class: 'i-carbon-account mr-3',
    href: '/'
  },
  {
    name: 'Posts',
    class: 'i-carbon-blog mr-3',
    href: '/posts'
  },
  {
    name: 'Category',
    class: 'i-carbon-folders mr-3',
    href: '/categories'
  },
  {
    name: 'Tag',
    class: 'i-carbon-tag-group mr-3',
    href: '/tags'
  },
  {
    name: 'Rss',
    class: 'i-carbon-rss mr-3',
    href: '/rss'
  }
]



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
