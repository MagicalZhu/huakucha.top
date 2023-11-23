<script lang="ts" setup>
// import tippy, {animateFill} from 'tippy.js';
const { y } = useWindowScroll()


let shown = $ref(false)
watch(y, () => {
  shown = y.value > 10
})
async function backToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}


onMounted(() => {
  /*
  tippy('#goback', {
    content: "Scroll To Top",
    arrow: true,
    placement: "left-start",
    animateFill: true,
    plugins: [animateFill]
  });

  tippy('#toggleDarkMode', {
    content: "Toggle Color Mode",
    arrow: true,
    placement: "left-start",
    animateFill: true,
    plugins: [animateFill]
  });
  */
})

</script>

<template>
  <div class="flex fixed bottom-[2.5em] right-[15px] flex-col z-[5] gap-[0.5rem]">
    <Transition name="page-fade">
      <div v-show="shown">
        <button class="box icon-btn mx-2 text-xl stroke-current text-gray-600" @click="backToTop()">
          <icon-prime:arrow-up/>
        </button>
      </div>
    </Transition>
    <!-- <div class="box icon-btn mx-2 dropdown dropdown--hoverable">
      <div i="ri-wechat-line"></div>
      <img src="/img/wx.png" alt="" class="dropdown__menu">
    </div> -->
    <!-- <button class="box icon-btn mx-2 text-xl stroke-current text-gray-600 !outline-none" @click="toggleDark()" id="toggleDarkMode">
      <div class="dark:i-cil:moon i-cil:sun"></div>
    </button> -->

    <!-- <button class="box icon-btn mx-2">
      <div i-carbon:settings></div>
    </button> -->
  </div>
</template>


<style scoped>

.box {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
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
