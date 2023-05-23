<script setup lang="ts">
  import { Project } from "internal";
  defineProps<{ projects: Record<string, Project[]> }>();

  const title = useTitle()
  title.value = `Projects`

  function slug(name: string) {
    return name.toLowerCase().replace(/[\s\\\/]+/g, '-')
  }
</script>
<template>
  <div class="max-w-300 mx-auto">
    <div  v-for="key, index in Object.keys(projects)"
          :key="key"
          slide-enter
          :style="{ '--enter-stage': index + 1 }"
    >
      <h1 :id="slug(key)"
          mt-8 pb-4 font-black text-center font-serif text-2xl
          class="projectTitle">
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
            <template font-serif text-dark flex>
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
            <div text-sm text-dark-1>{{ item.desc }}</div>
          </template>
        </a>
      </div>
    </div>
  </div>
  <!--toc-->
  <div class="table-of-contents">
    <ul>
      <li v-for="key of Object.keys(projects)" :key="key">
        <a font-mono text-sm :href="`#${slug(key)}`">{{ key }} </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>

.projectTitle {
  color: #000 !important;
}

.project-grid a.item {
  background: transparent;
  width: 350px;
}

.linkIcon {
  @apply font-bold text-sm opacity-50 hover:opacity-100 block transition-opacity ml-3 mt-3px;
}


@media (max-width: 1200px) {
  .not-prose .table-of-contents{
    display: none;
  }
}

.not-prose .table-of-contents {
  position: fixed;
  top: 80px;
  padding-top: 70px;
  font-size: 0.8em;
  right: 10px;
  width: 150px;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  text-overflow: ellipsis;
  opacity: 0;
  transition: all .4s ease-out;
}

.not-prose .table-of-contents:hover {
  opacity: 1.0;
}

.not-prose .table-of-contents ul > li::before {
  display: none;
}

.not-prose .table-of-contents ul > li {
  padding-left: 0.8rem;
}
</style>


<route lang="yaml">
  meta:
    layout: about
</route>
