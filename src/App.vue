<script setup lang="ts">
import { isClient } from "@renovamen/utils";
import getVal from 'lodash/get'

const {addRouteMeta, getThemeConfig} = useConfigStore()

useHead({
  title: getThemeConfig().authorName,
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.svg'
    }
  ],
  meta: [
    { name: "description", content: "A dragon lost in human world." },
    {
      name: "theme-color",
      content: computed(() => (isDark.value ? "#000000" : "#ffffff"))
    }
  ]
});

// Scroll to top after route change
const route = useRoute();

watch(
  () => route.path,
  () => isClient && window.scrollTo({ top: 0 })
);


if (getThemeConfig().openChat) {
  onMounted(() => {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//code.tidio.co/qwk9qte5egxnkdfihrkvnceibygjnwpf.js';
    document.head.appendChild(script);
  })
}

const router = useRouter()

router.beforeEach(async (to, from) => {
  if (getVal(to, 'meta.frontmatter.lock')) {
      const allow = localStorage.getItem('allow')
      if (allow && allow === 'true') return true
      const sign = prompt("Enter the password...")
      if (sign == "zyl1995"){
        localStorage.setItem('allow', 'true')
        return true
      }
      return false
    }
    return true
})

const routes = router.getRoutes()

if(routes.length > 0) {
  routes.forEach((route:any) => {
    if (route.meta.layout && route.meta.layout === 'post') {
      addRouteMeta(route.meta)
    }
  })
}


// clear storage
localStorage.removeItem('allow')


</script>

<template>
  <RouterView />
</template>
