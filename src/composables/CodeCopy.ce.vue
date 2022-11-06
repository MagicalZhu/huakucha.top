<script setup>
  import {defineProps} from 'vue'
  defineProps({
    lang: String
  })
</script>
<template>
  <span class="codeLang">
    {{lang}}
  </span>
</template>

<style scoped>
.codeLang {
  @apply float-right text-gray-300 dark:text-gray-500 text-base;
}
</style>
