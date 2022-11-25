<script setup lang="ts">
defineProps<{
  text?: string
  type?: 'info' | 'tip' | 'warning' | 'danger'
}>()
</script>

<template>
  <span class="VPBadge" :class="type ?? 'tip'">
    <slot>{{ text }}</slot>
  </span>
</template>
<style scoped>
.VPBadge {
  display: inline-block;
  margin-left: 2px;
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 0 8px;
  line-height: 18px;
  font-size: 13px;
  font-weight: 600;
  transform: translateY(-2px);
}
h2 .VPBadge {
  border-radius: 11px;
  line-height: 20px;
}
.VPBadge.info {
  border-color: var(--vb-badge-info-border);
  color: var(--vb-badge-info-text);
  background-color: var(--vb-badge-info-bg);
}
.VPBadge.tip {
  border-color: var(--vb-badge-tip-border);
  color: var(--vb-badge-tip-text);
  background-color: var(--vb-badge-tip-bg);
}
.VPBadge.warning {
  border-color: var(--vb-badge-warning-border);
  color: var(--vb-badge-warning-text);
  background-color: var(--vb-badge-warning-bg);
}
.VPBadge.danger {
  border-color: var(--vb-badge-danger-border);
  color: var(--vb-badge-danger-text);
  background-color: var(--vb-badge-danger-bg);
}
</style>