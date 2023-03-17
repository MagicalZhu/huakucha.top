<script setup lang="ts">
import { isClient } from "@renovamen/utils";
import { defineCustomElement } from "vue";
import { GlobalThemeOverrides } from 'naive-ui'
import CopyCode from "./composables/CodeCopy.ce.vue"

const {addRouteMeta, getThemeConfig} = useConfigStore()


useHead({
  title: getThemeConfig().authorName,
  link: [
    {rel: 'icon', href: 'img/favicon.ico'}
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
const routes = router.getRoutes()

if(routes.length > 0) {
  routes.forEach((route:any) => {
    if (route.meta.layout && route.meta.layout === 'post') {
      addRouteMeta(route.meta)
    }
  })
}

// rewrite theme config
const themeOverrides: GlobalThemeOverrides = {
  Button: {
    colorHover: '#000'
  },
  DataTable: {
    paginationMargin: '40px 0 0 0',
    peers: {
      Empty: {
        textColor: '#ccc'
      },
      Pagination: {
        buttonColor: '#000',
        itemTextColor: '#ccc'
      }
    }
  }
}

// clear storage
localStorage.removeItem('allow')
customElements.define('copy-code', defineCustomElement(CopyCode))


</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-global-style />
    <n-message-provider>
      <RouterView />
    </n-message-provider>
  </n-config-provider>
</template>