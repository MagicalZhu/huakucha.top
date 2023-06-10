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
  gray: 'bg-gray-200 text-gray-800',
  indigo: 'bg-indigo-100 text-indigo-800',
  purple: 'bg-purple-100 text-purple-800',
  orange: 'bg-orange-100 text-orange-800',
  lime: 'bg-lime-100 text-lime-800',
  amber: 'bg-amber-100 text-amber-800',
  emerald: 'bg-emerald-100 text-emerald-800',
  teal: 'bg-teal-100 text-teal-800',
  fuchsia: 'bg-fuchsia-100 text-fuchsia-800',
}


const colorClass:string = props.type && colorMap[props.type]  ?  colorMap[props.type] : 'bg-gray-100 text-gray-800'

</script>

<template>
  <span class="inline-flex items-center  py-1 px-2  mr-1 rounded-md badgeClass text-sm"
        :class="colorClass"
        v-bind="$attrs">
    <slot v-if="text">
      {{ text }}
    </slot>
    <slot name="content" v-else>
    </slot>
  </span>
</template>
<style scoped>

.badgeClass {
  align-items: center;
  padding:12px;
  border-radius: 5px;
  height: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 120%;
}
</style>
