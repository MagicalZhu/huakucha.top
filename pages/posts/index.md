<BlogList :blogMap="blogMap"/>

<script setup lang='ts'>
import {BlogType as Blog} from 'internal';

defineProps<{
  blogMap: Record<string, Blog[]>
}>()

</script>


<route lang="yaml">
meta:
  layout: showBlogs
  props: blogMap
</route>