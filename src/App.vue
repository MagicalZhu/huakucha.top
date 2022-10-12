<script setup lang="ts">
import { isClient } from "@renovamen/utils";

useHead({
  title: "Xiaohan Zou",
  meta: [
    { name: "description", content: "A dragon lost in human world." },
    {
      name: "theme-color",
      content: computed(() => (isDark.value ? "#374151" : "#ffffff"))
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
const {addRouteMeta, getRouteMetas} = useConfigStore()

if(routes.length > 0) {
  routes.forEach((route:any) => {
    if (route.meta.layout && route.meta.layout === 'post') {
      addRouteMeta(route.meta)
    }
  })
}

console.log(getRouteMetas())

</script>

<template>
  <RouterView />
</template>
