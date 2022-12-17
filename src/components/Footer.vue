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
  <footer font="mono"
          text="sm center c-lighter"
          bottom-2>
      <span>
          {{ weekMap.get(time.getDay()) }}, <time :datetime="time.toISOString()" :title="time.toISOString()">{{ time.toLocaleTimeString('en-US', { hour12: false }) }}</time>
          · Built <time :datetime="buildTime" :title="buildTime">{{ buildTimeAgo }}</time>
      </span>
      <br/>
      <span v-html="getThemeConfig().footer.copyright"></span>
  </footer>
  <Background/>
</template>
