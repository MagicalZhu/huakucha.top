<script setup lang="ts">
  const {getThemeConfig} = useConfigStore()
  const time = ref(new Date())
  const weekMap = new Map([
    [0, 'Sun'],
    [1, 'Mon'],
    [2, 'Tue'],
    [3, 'Wed'],
    [4, 'Thu'],
    [5, 'Fri'],
    [6, 'Sat'],
  ])
  const buildTime = import.meta.env.__BUILD_TIME__ as string
  const buildTimeAgo = useTimeAgo(buildTime)

  useIntervalFn(() => {
    time.value = new Date()
  }, 1000)
</script>

<template>
  <footer class="bottom-[2em]">
    <ul class="font-mono text-xs text-muted-foreground text-center">
      <li class="inline-block relative pr-8"
          v-html="getThemeConfig().footer.copyright">
      </li>
      <li class="md:inline-block md:absolute hidden right-[2em]">
        {{ weekMap.get(time.getDay()) }}, <time :datetime="time.toISOString()" :title="time.toISOString()">{{ time.toLocaleTimeString('en-US', { hour12: false }) }}</time>
          · Built <time :datetime="buildTime" :title="buildTime">{{ buildTimeAgo }}</time>
      </li>
    </ul>
  </footer>
  <Background/>
</template>
