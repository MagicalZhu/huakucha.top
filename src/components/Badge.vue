<script setup lang="ts">
defineProps<{
  text?: string
  type?: 'info' | 'tip' | 'warning' | 'danger' | 'note'
}>()
</script>

<template>
  <span class="MBadge" :class="type ?? 'tip'">
    <slot>{{ text }}</slot>
  </span>
</template>
<style scoped>
.MBadge {
  @apply text-white;
  display: inline;
  margin-left: 2px;
  border: 1px solid transparent;
  border-radius: 5px;
  padding: 2px 8px;
  font-size: 14px;
  font-weight: 600;
  transform: translateY(-2px);
  vertical-align: top;
}

h1 .MBadge {
  line-height: 14px;
  font-size: 16px;
}
h2 .MBadge {
  line-height: 14px;
  font-size: 15px;
}

h3 .MBadge {
  line-height: 13px;
  font-size: 14px;
}

h4 .MBadge {
  line-height: 13px;
  font-size: 13px;
}
h5 .MBadge {
  line-height: 12px;
  font-size: 12px;
}

.MBadge.note {
  background-color: #3f69e8;
}
.MBadge.info {
  background-color: #828282;
}
.MBadge.tip {
  background-color: #4abf8a;
}
.MBadge.warning {
  background-color: #f4cd00;
}
.MBadge.danger {
  background-color: #f55;
}
</style>
