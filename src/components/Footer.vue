<script setup lang="ts">
  const {getThemeConfig} = useConfigStore()
</script>

<template>
  <footer font="ui" text="sm center c-lighter" m="t-20" v-html="getThemeConfig().footer.copyright">
  </footer>
</template>
