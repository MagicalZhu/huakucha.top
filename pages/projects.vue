<script setup lang="ts">
  import { Project } from "internal";
  // set title
  const title = useTitle()
  title.value = `Category`


  const projects: Record<string, Project[]>  = {
    'Current Focus': [
      {
        name: 'NoteBook',
        desc: 'Record My Learning Process',
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
      },
    ]
  }
</script>
<template>
  <main class="not-prose">
    <ProjectList :projects="projects"/>
  </main>
</template>

<route lang="yaml">
  meta:
    layout: about
</route>
