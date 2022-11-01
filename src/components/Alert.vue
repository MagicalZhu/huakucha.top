<template>
  <div class="flex p-4 mb-4 text-base text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800" 
       role="alert">
    <span i-carbon:idea class="text-lg mr-2"></span>
    <span class="sr-only">Info</span>
    <div>
      <span class="font-500 text-base">
        <slot/>
      </span>
    </div>
  </div>
</template>
