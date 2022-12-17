<!--
  layout for about page: about 画面的 layout
-->
<template>
  <main class="flex flex-col min-h-full text-c" p="x-4 t-24 b-3">
    <div class="flex-1 mb-6">
      <Navbar>
        <slot name="navbar"></slot>
      </Navbar>
      <RouterView />
    </div>
    <!-- <Links :links="socials" class="justify-center"/> -->
    <Footer></Footer>
    <WelcomeMsg/>
  </main>
</template>
