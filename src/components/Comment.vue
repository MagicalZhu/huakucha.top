<script setup lang="ts">
import Giscus from '@giscus/vue'
const CommentConfig = useConfigStore().getThemeConfig().comments
</script>

<template>
  <div class="prose-lg mt-6 mb-8 mx-auto">
  <Giscus v-show="CommentConfig.isOpen"
      :id="CommentConfig.config.id"
      :repo="CommentConfig.config.repo"
      :repoId="CommentConfig.config.repoId"
      :category='CommentConfig.config.category'
      :categoryId='CommentConfig.config.categoryId'
      :mapping="CommentConfig.config.mapping"
      :reactionsEnabled="CommentConfig.config.reactionsEnabled"
      :inputPosition="CommentConfig.config.inputPosition"
      :theme='CommentConfig.config.theme'
      :lang="CommentConfig.config.lang"
      :loading="CommentConfig.config.loading">
    </Giscus>
  </div>
</template>
