<script setup lang="ts">
  import { Project } from "internal";
  // set title
  const title = useTitle()
  title.value = `Category`


  const projects: Record<string, Project[]>  = {
    'Current Focus': [
      {
        name: 'NoteBook',
        desc: 'My Note Platform',
        icon: 'i-carbon:wikis saturate-0',
        repo: 'https://github.com/MagicalZhu/NoteLib',
        home: 'https://wiki.huakucha.top'
      },
      {
        name: 'Blog',
        desc: 'My Blog Platform',
        icon: 'i-carbon:wikis saturate-0',
        repo: 'https://github.com/MagicalZhu/vitesseDoc',
        home: 'https://blog.huakucha.top'
      }
    ]
  }
</script>
<template>
  <main class="not-prose">
    <ProjectList :projects="projects"/>
  </main>
</template>

<style scoped>
  .not-prose {
    max-width: 70ch;
    @apply mx-auto text-dark;
  }
</style>

<route lang="yaml">
  meta:
    layout: about
</route>
