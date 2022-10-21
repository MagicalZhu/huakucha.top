<BlogList :blogData="blogData"/>

<script setup lang='ts'>
type Blog = {
  path: string;
  title: string;
  date: string;
}

defineProps<{
  blogData: Record<string, Blog[]>
}>()

</script>


<route lang="yaml">
meta:
  layout: showBlogs
  props: blogData
</route>