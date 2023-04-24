<script setup lang="ts">
defineProps<{
  src: string,
  intro?: string
}>()
</script>


<template>
  <figure>
    <img :src="src"/>
    <figcaption text-gray-400 text-sm text-center select-none>{{intro}}</figcaption>
  </figure>
</template>
