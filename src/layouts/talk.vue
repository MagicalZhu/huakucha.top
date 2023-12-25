<template>
  <main class="flex flex-col min-h-full text-c slide-enter px-4 pb-3">
    <div class="flex-1">
      <Navbar>
        <slot name="navbar"></slot>
      </Navbar>
      <RouterView class="mt-12"/>
    </div>
  </main>
</template>
