<script setup lang="ts">
  import { Project } from "internal";
  import { slug } from '~/utils/index'
  defineProps<{ projects: Record<string, Project[]> }>();

  useCustomTitle('Projects')

</script>
<template>
  <div class="max-w-300 mx-auto">
    <div  v-for="key, index in Object.keys(projects)"
          :key="key"
          class="slide-enter"
          :style="{ '--enter-stage': index + 1 }"
    >
      <h1 :id="slug(key)"
          class="mt-8 pb-4 font-black text-center font-serif text-2xl text-black">
        {{ key }}
      </h1>
      <div
        class="project-grid py-8px max-w-200 w-max"
        grid="~ cols-1 md:cols-2 lg:cols-3 gap-1"
        :class="projects[key].length === 1 ? 'flex' : ''"
        >
        <a v-for="item, idx in projects[key]"
          :key="idx"
          class="item flex-auto items-center opacity-50 hover:opacity-100 transition-opacity"
          :href="item.repo"
          target="_blank"
          :title="item.name"
        >
          <template class="block transition-opacity">
            <template class="font-serif text-black flex">
              <span> {{ item.name }}</span>
                <a
                  target="_blank"
                  title="Git"
                  :href=item.repo
                  class="linkIcon i-ph:git-branch"
                ></a>
                <a
                  target="_blank"
                  title="Home"
                  class="linkIcon i-ph-link"
                  :href=item.home
                ></a>
            </template>
            <div class="text-sm text-muted-foreground">{{ item.desc }}</div>
          </template>
        </a>
      </div>
    </div>
  </div>
  <!--toc-->
  <div class="table-of-contents">
    <ul>
      <li v-for="key of Object.keys(projects)" :key="key">
        <a class="font-mono text-sm" :href="`#${slug(key)}`">{{ key }} </a>
      </li>
    </ul>
  </div>
</template>


<route lang="yaml">
  meta:
    layout: about
</route>
