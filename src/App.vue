<script setup lang="ts">
import { isClient } from "@renovamen/utils";
const {addRouteMeta, getThemeConfig} = useConfigStore()


useHead({
  title: getThemeConfig().authorName,
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



customElements.define('copy-code', class extends HTMLElement {
      /* 当test-shadow-root组件被挂载到DOM上时，执行构造函数 */
      constructor() {
        super()
        const shadowRoot = this.attachShadow({mode: 'open'}) //给指定的元素挂载影子DOM
        // 当执行 this.attachShadow()方法时，shadowRoot被挂载构造函数中，可以通过this访问
        // mode open shadow root元素可以从js外部访问根节点
        // mode closed  拒绝从js外部访问关闭的shadow root节点
        // console.log('执行', this)
        const div = document.createElement('div')
        div.className = 'codelang'
        div.textContent = '我是div的内容'
        // shadowRoot.appendChild()
        // console.log('this', this.shadowRoot)
        shadowRoot.appendChild(div)
        // this.shadowRoot === shadowRoot  true
      }
    })

</script>

<template>
  <RouterView />
</template>
