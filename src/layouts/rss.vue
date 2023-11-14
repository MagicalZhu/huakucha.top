<template>
  <main class="flex flex-col min-h-full text-c slide-enter" p="x-4 t-24 b-6">
    <div class="flex-1 mb-6">
      <Navbar>
        <slot name="navbar"></slot>
      </Navbar>
      <router-view/>
    </div>
  </main>
</template>
