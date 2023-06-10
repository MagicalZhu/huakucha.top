<!--
  layout for about index
-->
<template>
  <main class="flex flex-col min-h-full text-c slide-enter" px-4 pt-5em pb-3>
    <div class="flex-1">
      <Navbar>
        <slot name="navbar"></slot>
      </Navbar>
      <RouterView />
    </div>
    <Footer></Footer>
  </main>
</template>