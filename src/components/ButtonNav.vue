<script lang="ts" setup>
import tippy, {animateFill} from 'tippy.js';
const { y } = useWindowScroll()


let shown = $ref(false)
watch(y, () => {
  shown = y.value > 10
})
async function backToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}


onMounted(() => {
  tippy('#goback', {
    content: "返回顶部",
    arrow: true,
    placement: "left-start",
    animateFill: true,
    plugins: [animateFill]
  });
  tippy('#toggleDarkMode', {
    content: "切换模式",
    arrow: true,
    placement: "left-start",
    animateFill: true,
    plugins: [animateFill]
  });
})

</script>

<template>
  <div class="footer-tools">
    <Transition name="page-fade">
      <div v-show="shown">
        <button class="box icon-btn mx-2" @click="backToTop()" id="goback">
          <div i="ri-arrow-up-line"></div>
        </button>
      </div>
    </Transition>
    <!-- <div class="box icon-btn mx-2 dropdown dropdown--hoverable">
      <div i="ri-wechat-line"></div>
      <img src="/img/wx.png" alt="" class="dropdown__menu">
    </div> -->
    <button class="box icon-btn mx-2 !outline-none" @click="toggleDark()" id="toggleDarkMode">
      <div i="ri-sun-line dark:ri-moon-line"></div>
    </button>
    <button class="box icon-btn mx-2">
      <div i-carbon:settings></div>
    </button>
  </div>
</template>

<style scoped>
.footer-tools {
  position: fixed;
  bottom: 15px;
  right: 15px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 5;
}

.box {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dark .box {
  background-color: #333;
}
.dropdown {
  position: relative;
}

.dropdown__menu {
  position: absolute;
  left: calc(-0.5rem - 100px);
  top: 50%;
  transform: translate(0, -50%);
}

.dropdown img {
  min-width: 100px;
  height: 100px;
  opacity: 0;
  transition: opacity .3s ease-in-out;
}

.dropdown--hoverable:hover .dropdown__menu,
.dropdown--show .dropdown__menu {
  opacity: 1;
  pointer-events: all;
  visibility: visible;
}
</style>
