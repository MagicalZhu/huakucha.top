<script setup lang="ts">
import { isClient } from "@renovamen/utils";
import { defineCustomElement } from "vue";
import CopyCode from "./composables/CodeCopy.ce.vue"
const {addRouteMeta, getThemeConfig} = useConfigStore()


useHead({
  script() {
    return [{
      src: '//code.tidio.co/qwk9qte5egxnkdfihrkvnceibygjnwpf.js',
      type: 'text/javascript'
    }]
  },
  title: getThemeConfig().authorName,
  link: [
    {rel: 'icon', href: 'img/avatar.jpg'}
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

const router = useRouter()
const routes = router.getRoutes()

if(routes.length > 0) {
  routes.forEach((route:any) => {
    if (route.meta.layout && route.meta.layout === 'post') {
      addRouteMeta(route.meta)
    }
  })
}

customElements.define('copy-code', defineCustomElement(CopyCode))

</script>

<template>
  <RouterView />
</template>
