<!--
  layout for about index
-->
<template>
  <main class="flex flex-col min-h-full slide-enter px-4 pb-3">
    <div class="flex-1">
      <Navbar>
        <slot name="navbar"></slot>
      </Navbar>
      <RouterView class="pt-[5em]"/>
    </div>
    <Footer></Footer>
  </main>
</template>
