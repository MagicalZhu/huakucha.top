<script setup lang="ts">
const props = defineProps<{
  text?: string
  type?: string,
}>()

const colorMap: {[propsName:string]:string} = {
  blue: 'bg-blue-100 text-blue-800',
  green: 'bg-green-100 text-green-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  red: 'bg-red-100 text-red-800',
  gray: 'bg-gray-100 text-gray-800',
  indigo: 'bg-indigo-100 text-indigo-800',
  purple: 'bg-purple-100 text-purple-800',
}

const colorClass:string = props.type && colorMap[props.type]  ?  colorMap[props.type] : 'bg-gray-100 text-gray-800'

</script>

<template>
  <span class="inline-flex items-center  py-1 px-2  mr-1 rounded-md text-sm font-medium"
        :class="colorClass">
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
