<script setup lang="ts">
import {Ref} from 'vue'
import {Social} from "internal"
const socials:Ref<Social[]> = ref([])

socials.value = [{
    icon: 'i-carbon:email',
    link: 'mailto:18151271579@163.com'
    },{
        icon: 'i-eva:github-outline',
        link: 'https://github.com/MagicalZhu'
    }, {
        icon: 'i-carbon:book',
        link: 'https://www.huakucha.top'
    },{
        icon: 'i-tabler:letter-j',
        link: 'https://okjk.co/V3s0CF'
    }
]

</script>
<template>
  <main class="flex flex-col min-h-full text-c" p="x-4 t-24 b-6">
    <div class="flex-1 mb-6">
      <Navbar>
        <slot name="navbar"></slot>
      </Navbar>
      <slot></slot>
      <Links :links="socials" class="ml-100"/>
    </div>
    <Footer>
    </Footer>
  </main>
</template>
