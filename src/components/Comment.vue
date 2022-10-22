
<!-- Comment Component -->
<template>
  <div class="prose-lg mt-6 mb-8 mx-auto">
  <giscus-widget v-show="CommentConfig.isOpen"
      :id="CommentConfig.config.id"
      :repo="CommentConfig.config.repo"
      :repoId="CommentConfig.config.repoId"
      :category='CommentConfig.config.category'
      :categoryId='CommentConfig.config.categoryId'
      :mapping="CommentConfig.config.mapping"
      :inputPosition="CommentConfig.config.inputPosition"
      :theme='theme'
      :lang="locale"
      :loading="CommentConfig.config.loading">
    </giscus-widget>
  </div>
</template>
<script setup>
import 'giscus'
const CommentConfig = useConfigStore().getThemeConfig().comments
const theme = computed(() => {
  return isDark.value ? 'dark' : 'light'
})
const { locale } = useI18n()

</script>
