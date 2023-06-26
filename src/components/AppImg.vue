<script setup lang="ts">
defineProps<{
  src: string,
  intro?: string
}>()
</script>


<template>
  <figure w-fit m-auto>
    <img :src="src"/>
    <figcaption text-gray-400 text-sm text-center  pt-3>{{intro}}</figcaption>
  </figure>
</template>
