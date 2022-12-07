<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  to: string
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
</template>

<style scoped>
.appLink:after {
  display: inline-block;
  margin-left: 2px;
  font-weight: 700;
  content: "↗";
  transform: scale(0.7) translate(-3px, 4px);
  transform-origin: right top;
}
</style>
