<script setup>
  import {defineProps} from 'vue'
  defineProps({
    lang: String
  })
  const copyMsg = $ref('copy')
  const doCopy = () => {
    copyMsg = 'copied'
    setTimeout(() => {
      copyMsg =  'copy'
    }, 5000)
  }
</script>
<template>
  <div>
    <span  class="copyBtn" @click="doCopy">
      {{copyMsg}}
    </span>
    <span class="codeLang">
      {{lang}}
    </span>
  </div>
</template>

<style scoped>
.codeLang {
  @apply float-right text-gray-300 dark:text-gray-500 text-base items-baseline mr-2;
}
.copyBtn {
  @apply float-right text-gray-300 dark:text-gray-500 text-base items-baseline cursor-pointer;
  @apply dark:border-gray-600 dark:text-gray-400 dark:bg-gray-800 hover:text-blue-700 dark:hover:text-white
}

</style>
