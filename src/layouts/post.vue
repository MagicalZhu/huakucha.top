<!--
  layout for blog content: 组织博客文章内容的 layout

-->
<template>
  <Layout class="post slide-enter">
    <template v-if="isToc" #navbar>
      <button nav-item title="TOC" @click="isTocOpen = !isTocOpen" class="tocBtn">
        <div i-carbon:table-of-contents />
      </button>
    </template>

    <div class="prose mx-auto text-center mt-6 mb-8">
      <h1 class="text-4xl font-bold">{{ title }}</h1>
      <p class="mt-6 ml-2">
        <span class="intro">
          <div i-carbon:user class="mr-1" v-if="blogConfig.author"/>
          {{blogConfig.author}}
          <div i-carbon:calendar class="mr-1" :class="[blogConfig.author && 'ml-4']"/>
          {{ formatDate(date, true) }}
          <div i-carbon:time class="ml-4 mr-1" />
          {{ readingTime }} {{$t('theme.blog.timeUnit')}}
        </span>
      </p>
    </div>

    <article ref="content" :class="isTocOpen && 'toc-open'">
      <RouterView />
    </article>
    <Comment/>
    <div
      v-if="blogConfig.showNextOrPrev &&(prevBlog || nextBlog)"
      class="prose mx-auto text-left grid md:grid-cols-2 pt-4 mt-16 border-t border-c"
    >
      <span class="prev">
        <RouterLink v-if="prevBlog" hover:no-underline :to="prevBlog.path" >
          {{ prevBlog.title }}
        </RouterLink>
      </span>
      <span class="next text-right">
        <RouterLink v-if="nextBlog" hover:no-underline :to="nextBlog.path" >
          {{ nextBlog.title }}
        </RouterLink>
      </span>
    </div>
  </Layout>
  <ButtonNav></ButtonNav>
</template>

<script setup lang="ts">
import { isClient } from "@renovamen/utils";
import { formatDate } from "~/utils";

const blogConfig = useConfigStore().getThemeConfig().blog
const router = useRouter();

const meta = computed(() => router.currentRoute.value.meta);

const title = computed(() => meta.value.frontmatter.title);
const date = computed(() => meta.value.date);
const readingTime = computed(() => meta.value.readingTime.minutes);

const prevBlog = computed(() => meta.value.prev);
const nextBlog = computed(() => meta.value.next);

const content = ref<HTMLDivElement>();

onMounted(() => {
  const navigate = () => {
    if (location.hash) {
      document
        .querySelector(decodeURIComponent(location.hash))
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAnchors = (event: MouseEvent & { target: HTMLElement }) => {
    const link = event.target.closest("a");

    if (
      !event.defaultPrevented &&
      link &&
      event.button === 0 &&
      link.target !== "_blank" &&
      link.rel !== "external" &&
      !link.download &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey
    ) {
      const url = new URL(link.href);
      if (url.origin !== window.location.origin) return;

      event.preventDefault();
      const { pathname, hash } = url;
      if (hash && (!pathname || pathname === location.pathname)) {
        window.history.replaceState({}, "", hash);
        navigate();
      } else {
        router.push({ path: pathname, hash });
      }
    }
  };

  const handleScroll = () => {
    if (isToc.value) {
      const toc = document.querySelector(".table-of-contents");
      const { y } = useWindowScroll()
      if (y.value === 0) {
        toc.style.top ='5em'
      } else {
        toc.style.top = y.value + 'px'
      }
    }
  }

  useEventListener(window, "scroll", handleScroll);
  useEventListener(window, "hashchange", navigate);
  useEventListener(content.value!, "click", handleAnchors, { passive: false });
  navigate();
  setTimeout(navigate, 500);
});

const toc = useConfigStore().getThemeConfig().toc

const isTocOpen = ref(toc.isTocOpen);
const isToc = ref(true);

onMounted(() => {
  const initToc = () =>
    nextTick(() => {
      if (isClient) {
        const toc = document.querySelector(".table-of-contents");
        toc.style.top = '5em'
        isToc.value = toc ? true : false;
      }
    });

  initToc();

  watch(
    () => router.currentRoute.value.path,
    () => initToc()
  );
});

</script>

<style scoped>
.prev a::before {
  content: "← ";
}
.next a::after {
  content: " →";
}

.intro {
  @apply opacity-50 text-sm font-400 inline-flex items-center;
  @apply text-dark-400;
  @apply dark:text-blue-300
}

@media (max-width: 1360px) {
  .tocBtn {
    display: none !important;
  }
}
</style>
