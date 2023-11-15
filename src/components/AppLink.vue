<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  to: string,
}>()
const isExternalLink = computed(() => {
  return typeof props.to === 'string' && props.to.startsWith('http')
})
</script>

<template>
  <a v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank" class="appLink">
    <slot />
  </a>
  <router-link v-else v-bind="$props">
    <slot />
  </router-link>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" class="appLinkeIcon" role="img" width="16" height="16" viewBox="0 0 24 24" data-v-047565da=""><path fill="currentColor" d="M18 10.82a1 1 0 0 0-1 1V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h7.18a1 1 0 0 0 0-2H5a3 3 0 0 0-3 3v11a3 3 0 0 0 3 3h11a3 3 0 0 0 3-3v-7.18a1 1 0 0 0-1-1Zm3.92-8.2a1 1 0 0 0-.54-.54A1 1 0 0 0 21 2h-6a1 1 0 0 0 0 2h3.59L8.29 14.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0L20 5.41V9a1 1 0 0 0 2 0V3a1 1 0 0 0-.08-.38Z"></path></svg>
</template>

<style scoped>
.appLink:after {
  display: inline-block;
  margin-left: 2px;
  font-weight: 700;
  transform: scale(0.7) translate(-3px, 4px);
  transform-origin: right top;
}

.appLinkeIcon {
  @apply inline;
  vertical-align: middle;
  margin-left: 5px;
}
</style>
